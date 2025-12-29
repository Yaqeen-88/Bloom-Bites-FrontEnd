import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Bloom from "./services/api"
import "./App.css"

import Nav from "./components/Nav"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import Cart from "./components/Cart"
import Candle from "./components/Candle"


const App = () => {
  const [user, setUser] = useState(null)

  const [cartCount, setCartCount] = useState(0)

  const handleLogout = () => {
    setUser(null)
    setCartCount(0)
    localStorage.clear()
  }

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  const getCartCount = async () => {
    try{
      const res = await Bloom.get("/orders")

      let items = []
      if (res.data.order && res.data.order.items) {
        items = res.data.order.items
      }

      const count = items.reduce((sum, item) => {
        if (item.quantity) {
          return sum + item.quantity
        } else {
          return sum + 1
        }
      }, 0)
      setCartCount(count)
    } catch (err) {
      console.log(err);
      setCartCount(0)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <Nav user={user} handleLogout={handleLogout} cartCount={cartCount}/>
      <main>
        <Routes>
          <Route path="/" element={<Home getCartCount={getCartCount} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart user={user} getCartCount={getCartCount} />} />
          <Route path="/candles" element={<Candle />} />
          <Route path="/candles/:id" element={<Candle/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
