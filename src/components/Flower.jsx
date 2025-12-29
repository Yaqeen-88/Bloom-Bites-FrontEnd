import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Bloom from "../services/api"

const Flower = ({ addToCart, user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdmin = user && user.role === "admin"

  const [flowers, setFlowers] = useState([])
  const [actFlower, setActFlower] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadFlowers = async () => {
    try {
      setLoading(true)
      const response = await Bloom.get("/flowers")
      const list = response.data
      setFlowers(list)
      if (id) {
        let here = null
        for (let i = 0; i < list.length; i++) {
          if (list[i]._id === id) {
            here = list[i]
            break
          }
        }
        setActFlower(here)
      } else {
        setActFlower(null)
      }
      setLoading(false)
    } catch (error) {
      console.log("Error!Something happened getting flowers", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFlowers()
  }, [id])

  const handleDelete = async () => {
    try {
      await Bloom.delete(`/flowers/${actFlower._id}`)
      navigate("/flowers")
    } catch (error) {
      console.log("Error has occurred deleting flower:", error)
    }
  }
  if (loading) {
    return <p className="flower-loading">Loading Flower...</p>
  }
  if (id) {
    if (!actFlower) {
      return (
        <div className="flower-notfound">
          <p>Flower not found.🥺</p>
          <Link to="/flowers" className="flower-goback">
            Back to Flowers
          </Link>
        </div>
      )
    }
    return (
      <div className="flower-details-page">
        <Link to="flowers" className="flower-goback">
          Back to Flowers
        </Link>
        <h1 className="flower-detailtitle">{actFlower.name}</h1>
        {isAdmin ? (
          <div className="admin-acts">
            <Link
              to={`/flowers/${actFlower._id}/edit`}
              className="admin-editbtn"
            >
              Edit
            </Link>
            <button className="admin-deletebtn" onClick={handleDelete}>
              Delete
            </button>{" "}
          </div>
        ) : null}
        <div className="flower-detail-layout">
          {actFlower.image ? (
            <img
              src={actFlower.image}
              alt={actFlower.name}
              className="candle-details-image"
            />
          ) : null}

          <div className="flower-details-side">
            <div className="flower-info-card">
              {actFlower.price ? (
                <p className="flower-details-price">Price:{actFlower.price}</p>
              ) : null}

              <h3 className="flower-deDesc-title">Description</h3>
              <p className="flower-deDesc">
                {" "}
                {actFlower.description || "No description available 🫙"}
              </p>
              <p className="flower-color">
                Color: {actFlower.color || "No data here❌"}
              </p>
            </div>
            <button
              className="add-to-cart details-addtocart"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart(e, "flowers", actFlower)
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flower-page">
      <h1 className="flower-title">Flowers</h1>

      {isAdmin ? (
        <Link to="/flowers/new" className="flower-addnew-btn">
          +Add New Flower
        </Link>
      ) : null}

      <div className="flowers-grid">
        {flowers.map((flower) => {
          return (
            <Link
              key={flower._id}
              to={`/flowers/${flower._id}`}
              className="candle-link"
            >
              <div className="flower-card">
                <div className="flower-card-media">
                  {flower.image ? (
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="flower-image"
                    />
                  ) : null}
                </div>
                <div className="flower-card-body">
                  <h3 className="flower-name">{flower.name}</h3>
                  {flower.price ? (
                    <p className="flower-price">Price:{flower.price}</p>
                  ) : null}
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addToCart(e, "flowers", flower)
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Flower
