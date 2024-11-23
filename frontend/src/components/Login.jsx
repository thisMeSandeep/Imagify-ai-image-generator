import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { motion } from "framer-motion"
import axios from 'axios';
import { toast } from "react-toastify";



const Login = () => {

    const [state, setState] = useState('login');
    const { setShowLogin, backendUrl, setUser, setCredit } = useContext(AppContext);


    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });


    //handle on Chnage
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    //handle form submit

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === 'login') {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, userData, { withCredentials: true });
                if (data.success) {
                    setUser(data.user.name);
                    setCredit(data.creditBalance);
                    setShowLogin(false);
                    alert(data.message)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, userData, { withCredentials: true });
                if (data.success) {
                    setUser(data.user.name);
                    setCredit(data.creditBalance);
                    setShowLogin(false);
                    alert(data.message)
                } else {
                    toast.error(data.message)
                }
            }

        } catch (err) {
            toast.error(err.message)
        }
    }


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <motion.form
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white p-10 rounded-xl text-slate-500">

                <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>

                <p className="text-sm">Welcome back! Please sign Up to continue</p>

                {state !== 'login' && <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                    <img src={assets.profile_icon} alt="" width={30} />
                    <input
                        type="text"
                        name='name'
                        value={userData.name}
                        placeholder="Full Name"
                        required
                        className="outline-none text-sm"
                        onChange={handleOnChange}
                    />
                </div>}

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                    <img src={assets.email_icon} alt="" width={20} />
                    <input
                        type="email"
                        name='email'
                        value={userData.email}
                        placeholder="Email"
                        required
                        className="outline-none text-sm"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                    <img src={assets.lock_icon} alt="" width={20} />
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        placeholder="password"
                        required
                        className="outline-none text-sm"
                        onChange={handleOnChange}
                    />
                </div>

                <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot password ?</p>

                <button
                    type="submit"
                    className="bg-blue-600 w-full text-white py-2 rounded-full"

                >{state === 'login' ? 'Login' : 'Create account'}</button>

                {state === 'login' ? <p className="mt-5 text-center ">Don't have an account ? <span className="text-blue-600 cursor-pointer" onClick={() => setState('sign up')}>Sign Up </span></p>
                    :
                    <p className="mt-5 text-center ">Already have an account ? <span className="text-blue-600 cursor-pointer" onClick={() => setState('login')}>Login instead</span></p>
                }

                <img src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowLogin(false)} />
            </motion.form>
        </div>
    )
}

export default Login