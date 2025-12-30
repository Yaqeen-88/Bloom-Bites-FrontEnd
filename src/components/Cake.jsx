import { Link, useParams, useNavigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import Bloom from '../services/api.js'


const Cake = ({ addToCart, user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdmin = user && user.role === "admin"
  const [cakes, setCakes]= useState ([])
  const [actCake, setActCake] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCakes = async () => {
    try {
      setLoading(true)
      const response = await Bloom.get("/cake")
      setCakes(response.data)

      if (id) {
        let here = null
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id === id) {
            here = response.data[i]
            break
          }
        }
        setActCake(here)
      } else {
        setActCake(null)
      }
      setLoading(false)
    } catch (error) {
      console.log("Error! Something happened getting cakes", error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getCakes()
  }, [id])
  const handleDelete = async () => {
    try {
      await Bloom.delete(`/cake/${actCake._id}`)
      navigate("/cake")
    } catch (error) {
      console.log("Error has occurred deleting cake:", error)
    }
  }
  if (loading) {
    return <p className="cake-loading">Loading cakes....</p>
  }
  if (id) {
    if (!actCake) {
      return (
        <div className="cake-notfound">
          <p>Cake not found.🥹</p>
          <Link to="/cake" className="cake-goback">
            Back to Cakes
          </Link>
        </div>
      )
    }
    return (
      <div className="cake-details-page">
        <Link to="/cake" className="cake-goback">
          Back to cakes
        </Link>
        <h1 className="cake-detailtitle">{actCake.name}</h1>
        {isAdmin ? (
          <div className="admin-acts">
            <Link
              to={`/cake/${actCake._id}/edit`}
              className="admin-editbtn">
              Edit
            </Link>
            <button className="admin-deletebtn" onClick={handleDelete}>
              Delete
            </button>
          </div>
          ) : null}
        <div className="cake-details-layout">
          {actCake.image ? (
            <img
              src={actCake.image}
              alt={actCake.name}
              className="cake-details-image"
            />
          ) : null}
          <div className="cake-details-side">
            <div className="cake-info-card">
                {actCake.flavour ? (
                <p className="cake-details-flavour">Flavour: {actCake.flavour}</p>
              ) : null}
              {actCake.price ? (
                <p className="cake-details-price">Price: {actCake.price} BHD</p>
              ) : null}
              <h3 className="cake-deDesc-title">Description</h3>
              <p className="cake-deDesc">
                {actCake.description || "No description available🫙"}
              </p>
              <p className="cake-stock">
              {actCake.stock ?
              `There ${actCake.stock === 1 ? 'is' : 'are'} ${actCake.stock} left.`
              : 'No data here❌'}
              </p>
            </div>
            <button
              className="add-to-cart details-addtocart"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart(e, "cake", actCake)
              }}
            >
              Add to cart 🛒
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="cake-page">
      <h1 className="cake-title"> Cakes</h1>
      {isAdmin ? (
        <Link to="/cake/new" className="cake-addnew-btn">
          + Add New Cake
        </Link>
      ) : null}
      <div className="cakes-grid">
        {cakes.map((cake) => {
          return (
            <Link
              key={cake._id}
              to={`/cake/${cake._id}`}
              className="cake-link"
            >
              <div className="cake-card">
                <div className="cake-card-media">
                  {cake.image ? (
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="cake-image"
                    />
                  ) : null}
                </div>
                <div className="cake-card-body">
                  <h3 className="cake-name">{cake.name}</h3>
                  {cake.price ? (
                    <p className="cake-price">Price: {cake.price} BHD</p>
                  ) : null}
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addToCart(e, "cakes", cake)
                    }}
                  >
                    Add to cart🛒
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
export default Cake



