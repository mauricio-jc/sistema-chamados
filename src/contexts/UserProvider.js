import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from "react-router-dom";

export const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModalLoading, setShowModalLoading] = useState(false);

    const modalLoadingClose = () => setShowModalLoading(false);
    const modalLoadingShow = () => setShowModalLoading(true);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('UserLogged');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            
            setLoading(false);
        }

        loadStorage();
    }, []);

    function logOut() {
        localStorage.removeItem('UserLogged');
        setUser(null);
        <Navigate to="/login" />
    }

    return(
        <UserContext.Provider value={
            {
                signed: !!user,
                user,
                loading,
                setUser,
                logOut,
                showModalLoading,
                modalLoadingShow,
                modalLoadingClose
            }
        }>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;