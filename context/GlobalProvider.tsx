import React from 'react';

export const GlobalContext = React.createContext({});

const GlobalProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [isAdmin, setIsAdmin] = React.useState(false);

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                isAdmin,
                setIsAdmin
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;