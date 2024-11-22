import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false)

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;