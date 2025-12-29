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

  useEffect(() => {
    if(user) {
      getOrders()
      if (getCartCount) {getCartCount()}
    } else {
      setOrder(null)
      setLoadingCart(false)
    }
  },[user])

  let items = []
  if (order && order.length > 0) {
    for (let i = 0; i < order.length; i++){
      if (order[i].items) {
        items = items.concat(order[i].items)
      }
    }
  }
  let total = 0
  for (let i = 0; i <items.length; i++) {
    const item = items[i]

    let price = 0
    if (item.price){
      price = item.price
    }

    let qty = 1
    if (item.quantity){
      qty = item.quantity
    }

    total = total + (price * qty )
  }

  if (loadingCart){
    return (
      <p className="cart-loading">Loading cart....</p>
    )
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <p className="cart-mt-text"> Oop... looks like there's nothing in your cart! </p>
        <button onClick={() => navigate("/")} > Go Home </button>
      </div>
    )
  }

  return user ? (
    <div className="cart-big-page">
      <h1 className="cart-big-title"> Your Cart</h1>

      <div className="car-layout">
        <div className="cart-items">
          {items.map((item) => (
            <Link key={item._id} to={`/${item.productType}/${item.productId}`} className="cart-linkitem" >
              <div className="cart-item-card">
                <h3>{item.productName}</h3>
                <p>Price: {item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="cart-summy">
          <p>Total: {total}</p>
          <button className="cartBtn">Checkout</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="cartGuest">
    <h3>Oops! You need to Sign In to have items here</h3>
    <button onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  )
}

export default Cart
