import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./components/Login"
import { AppContext } from "./context/AppContext"
import { useContext } from "react"

const App = () => {

  const { showLogin } = useContext(AppContext)

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to orange-50">
      <Navbar />
      {showLogin && <Login />}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App