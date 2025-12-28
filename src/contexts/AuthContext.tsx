import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase.config';
import { createData, readData, updateData } from '@/lib/firebase.service';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Register user baru
    const register = async (email: string, password: string, displayName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile dengan display name
            await updateProfile(user, { displayName });

            // Simpan data user tambahan ke Realtime Database
            await createData(`users/${user.uid}`, {
                email: user.email,
                displayName: displayName,
                createdAt: new Date().toISOString(),
                totalScore: 0,
                rank: 0,
                storiesCompleted: 0,
                achievements: [],
                bio: '',
                institution: '',
            });

            console.log('User berhasil didaftarkan:', user.uid);
        } catch (error: any) {
            console.error('Error saat registrasi:', error);
            throw new Error(error.message || 'Gagal mendaftar');
        }
    };

    // Login user
    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login berhasil');
        } catch (error: any) {
            console.error('Error saat login:', error);
            throw new Error(error.message || 'Gagal login');
        }
    };

    // Logout user
    const logout = async () => {
        try {
            await signOut(auth);
            console.log('Logout berhasil');
        } catch (error: any) {
            console.error('Error saat logout:', error);
            throw new Error(error.message || 'Gagal logout');
        }
    };

    // Reset password
    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Email reset password telah dikirim');
        } catch (error: any) {
            console.error('Error saat reset password:', error);
            throw new Error(error.message || 'Gagal mengirim email reset password');
        }
    };

    // Update user profile
    const updateUserProfile = async (displayName: string, photoURL?: string) => {
        if (!currentUser) {
            throw new Error('Tidak ada user yang login');
        }

        try {
            await updateProfile(currentUser, {
                displayName,
                ...(photoURL && { photoURL }),
            });

            // Update juga di Realtime Database
            await updateData(`users/${currentUser.uid}`, {
                displayName,
                ...(photoURL && { photoURL }),
            });

            console.log('Profile berhasil diupdate');
        } catch (error: any) {
            console.error('Error saat update profile:', error);
            throw new Error(error.message || 'Gagal update profile');
        }
    };

    // Monitor auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                console.log('User authenticated:', user.uid);
            } else {
                console.log('No user authenticated');
            }
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
