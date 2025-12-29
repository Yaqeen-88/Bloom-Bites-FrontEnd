import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Bloom from "../services/api"

const Cart = ({ getCartCount, user }) => {
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loadingCart, setLoadingCart] = useState(true)

  const getOrders = async () => {
    try {
      setLoadingCart(true)

      const response = await Bloom.get("/orders")

      setOrder(response.data)
      setLoadingCart(false)
    } catch (error) {
      console.log("Error! Something happened getting orders.", error)
      setOrder([])
      setLoadingCart(false)
    }
  }

  return <></>
}

export default Cart
