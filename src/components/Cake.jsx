import { Link } from 'react-router-dom'
import {useEffect, useState} from 'react'
import Bloom from '../services/api.js'


const Cake = () => {
  const [cakes, setCakes]= useState ([])
  const LoadingCakes= async () => {
    try {
      const response = await Bloom.get("/cake")
      setCakes(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    LoadingCakes()
  }, [])
  return (
    <div>
      <h1>Cakes</h1>
      <p></p>
      {cakes.map((cake) => (
        <div className="cake-card" key={cake.id}>
          <img src={cake.image} alt={cake.name}/>
          <h3>{cake.name}</h3>
          <h4>{cake.flavour}</h4>
          <p>{cake.description}</p>
          <p>{cake.price}</p>
          <p>There {cake.stock === 1 ? 'is' : 'are'} {cake.stock} left.</p>
          <button>+ Add to Cart</button>
        </div>
      ))}

    </div>
  )
}
export default Cake
