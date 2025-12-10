import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "libs"; // Your firebase config

export interface Admin {
    adminId: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    isActive?: boolean;
    createdAt?: any;
    createdBy?: string | null;
    lastLogin?: any;
}

export const useAdmins = () => {
    const [data, setData] = useState<Admin[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchAdmins = useCallback(async () => {
        try {
            setIsLoading(true);
            const adminsRef = collection(db, "admins");
            const snapshot = await getDocs(adminsRef);
            
            const admins: Admin[] = [];
            snapshot.forEach((doc) => {
                admins.push({
                    adminId: doc.id,
                    ...doc.data(),
                } as Admin);
            });
            
            setData(admins);
            setError(null);
        } catch (err) {
            setError(err as Error);
            console.error("Error fetching admins:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    return { data, isLoading, error, refetch: fetchAdmins };
};