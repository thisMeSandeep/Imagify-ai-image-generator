import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [credit, setCredit] = useState(false);

 

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    //loading credits

    const loadCreditData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                withCredentials: true
            });
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user.name);
            }
        } catch (err) {
            console.log(err);
        }

    }


    //logout
    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/logout`, null, { withCredentials: true });
            if (data.success) {
                setUser(null);
                setCredit(null);
                console.log("Logout successful");
            }
        } catch (err) {
            console.error("Logout Error:", err);
        }
    };



    useEffect(() => {
        loadCreditData();
    }, [])


    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        credit,
        setCredit,
        logout
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;