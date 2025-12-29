import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { CheckSession } from "./services/Auth"

import Nav from "./components/Nav"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import Flower from "./components/Flower"
import FlowerForm from "./components/FlowerForm"

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
          <Route path="/flowers" element={<Flower />} />
          <Route path="/flowers/new" element={<FlowerForm user={user} />} />
          <Route
            path="/flowers/:id/edit"
            element={<FlowerForm user={user} />}/>
            <Route path="/flowers/:id" element={<Flower/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
