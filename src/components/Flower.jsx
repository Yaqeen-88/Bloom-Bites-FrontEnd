import { useEffect, useState } from "react"
import Bloom from "../services/api"

const Flower = () => {
  const [flowers, setFlowers] = useState([])

  const loadFlowers = async () => {
    try {
      const response = await Bloom.get("/flowers")
      setFlowers(response.data)
    } catch (error) {
      console.error("Error fetching flowers:", error)
    }
  }
  useEffect(() => {
    loadFlowers()
  }, [])

  return (
    <>
      <h1>Flowers</h1>
      <p>Explore our fresh and beautiful flowers</p>
      {flowers.map((flower) => (
        <div key={flower._id}>
          <img src={flower.image} alt={flower.name} />
          <h3>{flower.name}</h3>
          <p>BHD {flower.price}</p>

          {flower.stock === 0 && <span>Out of stock</span>}
        </div>
      ))}
    </>
  )
}
export default Flower
