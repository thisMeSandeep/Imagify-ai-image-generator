import { assets } from "../assets/assets"
import { motion } from "framer-motion"
import { AppContext } from "../context/AppContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const GenerateButton = () => {

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
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center pb-16 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">See the magic.try now</h1>
            <button onClick={onClickHandler} className="mt-8 w-auto bg-black text-white sm:text-lg flex items-center gap-2 px-12 py-2.5 rounded-full hover:scale-105 transition-all duration-500">
                <span>Generate Image</span>
                <img src={assets.star_group} alt="" className="w-5" />
            </button>

        </motion.div>
    )
}

export default GenerateButton