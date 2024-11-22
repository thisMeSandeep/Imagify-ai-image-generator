import { assets } from "../assets/assets"
import { motion } from "framer-motion"
import { AppContext } from "../context/AppContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext);

    const navigate = useNavigate();

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        }
        else {
            setShowLogin(true);
        }
    }


    return (
        <motion.div
            className="flex flex-col justify-center items-center my-20 text-center"
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >

            <motion.div
                className="flex gap-2 px-6 py-1 rounded-full border border-neutral-500 items-center bg-white text-stone-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>

            <motion.h1
                className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
            >Turn text to <span className="text-blue-600">image</span>,in seconds</motion.h1>

            <motion.p
                className="text-center max-w-xl mx-auto mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.
            </motion.p>

            <motion.button
                onClick={onClickHandler}
                className="mt-8 w-auto bg-black text-white sm:text-lg flex items-center gap-2 px-12 py-2.5 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
            >
                <span>Generate Image</span>
                <img src={assets.star_group} alt="" className="w-5" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex items-center justify-center mt-16 gap-3 ">
                {Array(6).fill('').map((item, index) => (
                    <img src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} key={index} width={70} className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10" />
                ))}
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-2 text-neutral-600 "> Generated sample images from imagify</motion.p>

        </motion.div>
    )
}

export default Header