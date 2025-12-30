import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Cake from "./components/Cake"
import About from "./components/About"
import CakeForm from "./components/CakeForm"

import Bloom from "./services/api"
import "./App.css"

import Nav from "./components/Nav"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import Cart from "./components/Cart"
import Candle from "./components/Candle"
import CandleForm from "./components/CandleForm"

import Flower from "./components/Flower"
import FlowerForm from "./components/FlowerForm"

const App = () => {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  const addToCart = async (e, productType, product) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    try {
      const item = {
        productType: productType,
        productId: product._id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        quantity: 1
      }

      const addedItem = {
        items: [item],
        total: item.price * item.quantity
      }

      await Bloom.post("/orders", addedItem)

      console.log("Added to cart!");
      getCartCount()
    } catch (error) {
      console.log("Oh no! Something happened while adding to cart:", error);
    }
  }

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
      const orders = res.data

      let count = 0

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i]
        const items = order.items ? order.items : []

        for (let j = 0; j < items.length; j++) {
          const quan = items[j].quantity ? items[j].quantity : 1
          count = count + quan
        }
      }

      setCartCount(count)
    } catch (error) {
      console.log(error);
      setCartCount(0)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
      getCartCount()
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
          <Route path="/candles" element={<Candle addToCart={addToCart} user={user} />} />
          <Route path="/candles/:id" element={<Candle addToCart={addToCart} user={user} />} />
          <Route path="/candles/new" element={<CandleForm user={user} />} />
          <Route path="/candles/:id/edit" element={<CandleForm user={user} />} />
          <Route path="/flowers" element={<Flower addToCart={addToCart} user={user}/>} />
          <Route path="/flowers/new" element={<FlowerForm user={user} />} />
          <Route path="/flowers/:id/edit"element={<FlowerForm user={user} />}/>
            <Route path="/flowers/:id" element={<Flower addToCart={addToCart} user={user}/>}/>
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
