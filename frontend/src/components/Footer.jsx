import { assets } from "../assets/assets"
const Footer = () => {
    return (
        <div className="flex items-center justify-between gap-4 py-8 mt-20 ">
            <img src={assets.logo} alt="" width={150} />
            <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @snayal50.dev | All right reserved </p>

            <div className="flex items-center gap-2">
                <img src={assets.facebook_icon} alt="" width={35} className="hover:scale-105 duration-300 transition-all cursor-pointer"/>
                <img src={assets.twitter_icon} alt="" width={35} className="hover:scale-105 duration-300 transition-all cursor-pointer"/>
                <img src={assets.instagram_icon} alt="" width={35} className="hover:scale-105 duration-300 transition-all cursor-pointer"/>
            </div>
        </div>
    )
}

export default Footer