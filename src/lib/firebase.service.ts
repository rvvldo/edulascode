import {
    ref,
    set,
    get,
    update,
    remove,
    onValue,
    off,
    push,
    DatabaseReference,
    DataSnapshot,
} from 'firebase/database';
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { database, storage } from './firebase.config';

/**
 * Create (tambah) data baru ke Firebase Realtime Database
 * @param path - Path di database (contoh: 'users/userId')
 * @param data - Data yang akan disimpan
 */
export const createData = async (path: string, data: any): Promise<void> => {
    try {
        const dbRef = ref(database, path);
        await set(dbRef, data);
        console.log('Data berhasil disimpan ke:', path);
    } catch (error) {
        console.error('Error saat menyimpan data:', error);
        throw error;
    }
};

/**
 * Create data dengan auto-generated key (push)
 * @param path - Path di database
 * @param data - Data yang akan disimpan
 * @returns Key yang di-generate
 */
export const pushData = async (path: string, data: any): Promise<string> => {
    try {
        const dbRef = ref(database, path);
        const newRef = push(dbRef);
        await set(newRef, data);
        console.log('Data berhasil di-push dengan key:', newRef.key);
        return newRef.key!;
    } catch (error) {
        console.error('Error saat push data:', error);
        throw error;
    }
};

/**
 * Read (baca) data dari Firebase Realtime Database
 * @param path - Path di database
 * @returns Data yang dibaca
 */
export const readData = async <T = any>(path: string): Promise<T | null> => {
    try {
        const dbRef = ref(database, path);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            return snapshot.val() as T;
        } else {
            console.log('Tidak ada data di:', path);
            return null;
        }
    } catch (error) {
        console.error('Error saat membaca data:', error);
        throw error;
    }
};

/**
 * Update data yang sudah ada di Firebase Realtime Database
 * @param path - Path di database
 * @param updates - Object berisi field yang akan di-update
 */
export const updateData = async (path: string, updates: any): Promise<void> => {
    try {
        const dbRef = ref(database, path);
        await update(dbRef, updates);
        console.log('Data berhasil di-update di:', path);
    } catch (error) {
        console.error('Error saat update data:', error);
        throw error;
    }
};

/**
 * Delete (hapus) data dari Firebase Realtime Database
 * @param path - Path di database
 */
export const deleteData = async (path: string): Promise<void> => {
    try {
        const dbRef = ref(database, path);
        await remove(dbRef);
        console.log('Data berhasil dihapus dari:', path);
    } catch (error) {
        console.error('Error saat hapus data:', error);
        throw error;
    }
};

/**
 * Subscribe ke perubahan data real-time
 * @param path - Path di database
 * @param callback - Fungsi yang dipanggil saat data berubah
 * @returns Fungsi untuk unsubscribe
 */
export const subscribeToData = (
    path: string,
    callback: (data: any) => void
): (() => void) => {
    const dbRef = ref(database, path);

    const unsubscribe = onValue(
        dbRef,
        (snapshot: DataSnapshot) => {
            const data = snapshot.exists() ? snapshot.val() : null;
            callback(data);
        },
        (error) => {
            console.error('Error saat subscribe ke data:', error);
        }
    );

    // Return fungsi untuk unsubscribe
    return () => {
        off(dbRef);
        console.log('Unsubscribed dari:', path);
    };
};

/**
 * Unsubscribe dari listener tertentu
 * @param path - Path di database
 */
export const unsubscribeFromData = (path: string): void => {
    const dbRef = ref(database, path);
    off(dbRef);
    console.log('Unsubscribed dari:', path);
};

/**
 * Helper untuk mendapatkan reference ke path tertentu
 * @param path - Path di database
 */
export const getRef = (path: string): DatabaseReference => {
    return ref(database, path);
};

/**
 * Upload file ke Firebase Storage
 * @param file - File yang akan diupload
 * @param path - Path di storage (contoh: 'profile-photos/userId.jpg')
 * @returns URL download file
 */
export const uploadFile = async (file: File, path: string): Promise<string> => {
    try {
        console.log('Starting upload:', { path, fileName: file.name, fileSize: file.size, fileType: file.type });
        
        const fileRef = storageRef(storage, path);
        
        // Tambahkan metadata
        const metadata = {
            contentType: file.type,
            customMetadata: {
                uploadedAt: new Date().toISOString(),
            }
        };
        
        const snapshot = await uploadBytes(fileRef, file, metadata);
        console.log('Upload complete, getting download URL...');
        
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File berhasil diupload ke:', path, 'URL:', downloadURL);
        
        return downloadURL;
    } catch (error) {
        console.error('Error saat upload file:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        throw error;
    }
};

/**
 * Hapus file dari Firebase Storage
 * @param path - Path file di storage
 */
export const deleteFile = async (path: string): Promise<void> => {
    try {
        const fileRef = storageRef(storage, path);
        await deleteObject(fileRef);
        console.log('File berhasil dihapus dari:', path);
    } catch (error) {
        console.error('Error saat hapus file:', error);
        throw error;
    }
};

/**
 * Get download URL dari file di Storage
 * @param path - Path file di storage
 * @returns URL download file
 */
export const getFileURL = async (path: string): Promise<string> => {
    try {
        const fileRef = storageRef(storage, path);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Error saat get file URL:', error);
        throw error;
    }
};

/**
 * Sync leaderboard ranks to user profiles
 * Updates each user's leaderboardRank field based on their position in the leaderboard
 * @param usersData - Object containing all users data
 */
export const syncLeaderboardRanks = async (usersData: any): Promise<void> => {
    try {
        console.log('Starting leaderboard rank sync...');
        
        if (!usersData) {
            console.log('No users data to sync');
            return;
        }

        // Convert users object to array and sort by score
        const leaderboardData = Object.entries(usersData)
            .map(([uid, user]: [string, any]) => ({
                uid,
                score: user.totalScore || 0,
                role: user.role
            }))
            .filter(user => user.role !== 'admin' && user.role !== 'central_admin')
            .sort((a, b) => b.score - a.score)
            .slice(0, 50); // Top 50 only

        // Update each user's rank
        const updatePromises = leaderboardData.map((user, index) => {
            const rank = index + 1;
            return updateData(`users/${user.uid}`, { leaderboardRank: rank });
        });

        // Update users not in top 50 to have null rank
        const topUserIds = new Set(leaderboardData.map(u => u.uid));
        const otherUsersPromises = Object.entries(usersData)
            .filter(([uid, user]: [string, any]) => 
                !topUserIds.has(uid) && 
                user.role !== 'admin' && 
                user.role !== 'central_admin'
            )
            .map(([uid]) => updateData(`users/${uid}`, { leaderboardRank: null }));

        await Promise.all([...updatePromises, ...otherUsersPromises]);
        
        console.log(`Leaderboard ranks synced for ${leaderboardData.length} users`);
    } catch (error) {
        console.error('Error syncing leaderboard ranks:', error);
        throw error;
    }
};
