import React, { FC, PropsWithChildren, useEffect, useState, useContext } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import firebase_app from '../firebase/config';
const auth = getAuth(firebase_app);
type AuthContextType = {user?:User|null, loading?:boolean}
export const AuthContext = React.createContext<AuthContextType>({});

export const AuthContextProvider : FC<PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);