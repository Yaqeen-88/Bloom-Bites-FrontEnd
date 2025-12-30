import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Cake from "./components/Cake"
import About from "./components/About"
import CakeForm from "./components/CakeForm"


import Nav from "./components/Nav"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import Feed from "./components/Feed"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <Nav user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed user={user} />} />
          <Route path="/About" element={<About/>}   />
          <Route path="/cake" element={<Cake user={user}/>}/>
          <Route path="/cake/:id" element={<Cake user={user} />}/>
          <Route path="/cake/new" element={<CakeForm user={user} />} />
          <Route path="/cake/:id/edit" element={<CakeForm user={user} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
