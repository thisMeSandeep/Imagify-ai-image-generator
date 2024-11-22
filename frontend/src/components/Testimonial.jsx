import { assets, testimonialsData } from "../assets/assets"
import { motion } from "framer-motion"

const Testimonial = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center my-20 py-12">

            <h1 className="text-3xl sm:text-4xl font-semibold">Customer Testimonials</h1>
            <p className="text-gray-500 mb-8">What our Users are saying</p>

            <div className="flex flex-wrap gap-6">
                {
                    testimonialsData.map((testimonial, index) => (
                        <div key={index} className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <img src={testimonial.image} alt="" className="rounded-full size-14" />
                                <h2>{testimonial.name}</h2>
                                <p>{testimonial.role}</p>
                                <div className="flex mb-4 gap-1">
                                    {Array(testimonial.stars).fill().map((item, index) => (
                                        <img key={index} src={assets.rating_star} />
                                    ))}
                                </div>
                                <p className="text-center">{testimonial.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Testimonial