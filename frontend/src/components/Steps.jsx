import { stepsData } from "../assets/assets"
import { motion } from "framer-motion"

const Steps = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mt-5">

            <h1 className="text-black text-3xl sm:text-4xl font-semibold">How it works</h1>

            <p className="mt-2 mb-8 text-gray-600">Transform Words Into Stunning Images</p>

            <div className=" space-y-4 w-full max-w-3xl text-sm">
                {
                    stepsData.map((step, index) => (
                        <div key={index} className="flex items-center gap-4 border  p-5 px-8 rounded-lg bg-white/20 shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300">
                            <img src={step.icon} alt="" width={40} />
                            <div>
                                <h2 className="text-xl font-medium">{step.title}</h2>
                                <p className="text-gray-500">{step.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </motion.div>
    )
}

export default Steps