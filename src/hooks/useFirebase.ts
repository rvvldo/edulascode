import { useState, useEffect } from 'react';
import { subscribeToData, readData, updateData, createData } from '@/lib/firebase.service';

/**
 * Custom hook untuk real-time data dari Firebase
 * @param path - Path di database
 * @param initialValue - Nilai awal sebelum data dimuat
 */
export const useRealtimeData = <T = any>(
    path: string,
    initialValue: T | null = null
) => {
    const [data, setData] = useState<T | null>(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Subscribe ke perubahan real-time
        const unsubscribe = subscribeToData(path, (newData) => {
            setData(newData);
            setLoading(false);
        });

        // Cleanup saat component unmount
        return () => {
            unsubscribe();
        };
    }, [path]);

    return { data, loading, error };
};

/**
 * Custom hook untuk operasi Firebase dengan loading state
 */
export const useFirebaseOperation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const executeOperation = async <T = any>(
        operation: () => Promise<T>
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await operation();
            setLoading(false);
            return result;
        } catch (err) {
            const error = err as Error;
            setError(error);
            setLoading(false);
            return null;
        }
    };

    return { loading, error, executeOperation };
};

/**
 * Custom hook untuk membaca data sekali (tidak real-time)
 * @param path - Path di database
 */
export const useFirebaseData = <T = any>(path: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await readData<T>(path);
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [path]);

    const refetch = async () => {
        setLoading(true);
        try {
            const result = await readData<T>(path);
            setData(result);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch };
};
