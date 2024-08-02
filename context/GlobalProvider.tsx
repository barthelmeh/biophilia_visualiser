import React from 'react';

interface GlobalContextType {
    participant: Participant | null,
    setParticipant: React.Dispatch<React.SetStateAction<Participant | null>>;
    admin: Administrator | null,
    setAdmin: React.Dispatch<React.SetStateAction<Administrator | null>>;
}

const initialContext: GlobalContextType = {
    participant: null,
    setParticipant: () => {},
    admin: null,
    setAdmin: () => {}
}

export const GlobalContext = React.createContext(initialContext);

const GlobalProvider = ({ children }: { children: React.ReactNode}) => {

    const [participant, setParticipant] = React.useState<Participant | null>(null);
    const [admin, setAdmin] = React.useState<Administrator | null>(null);

    return (
        <GlobalContext.Provider
            value={{
                participant,
                setParticipant,
                admin,
                setAdmin
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;