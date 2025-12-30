import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Bloom from "../services/api"

const Candle = ({ addToCart, user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdmin = user && user.role === "admin"

  const [candles, setCandles] = useState([])
  const [actCandle, setActCandle] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCandles = async () => {
    try {
      setLoading(true)

      const response = await Bloom.get("/candles")
      const list = response.data
      setCandles(list)

      if (id) {
        let here = null
        for (let i = 0; i < list.length; i++) {
          if (list[i]._id === id) {
            here = list[i]
            break
          }
        }
        setActCandle(here)
      } else {
        setActCandle(null)
      }

      setLoading(false)
    } catch (error) {
      console.log("Error! Something happened getting candles", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCandles()
  }, [id])

  const handleDelete = async () => {
    try {
      await Bloom.delete(`/candles/${actCandle._id}`)
      navigate("/candles")
    } catch (error) {
      console.log("Error has occurred deleting candle:", error)
    }
  }

  if (loading) {
    return <p className="candle-loading">Loading candles....</p>
  }

  if (id) {
    if (!actCandle) {
      return (
        <div className="candle-notfound">
          <p>Candle not found. 🥺</p>
          <Link to="/candles" className="candle-goback">
            Back to Candles
          </Link>
        </div>
      )
    }

    return (
      <div className="candle-details-page">
        <Link to="/candles" className="candle-goback">
          Back to candles
        </Link>

        <h1 className="candle-detailtitle">{actCandle.name}</h1>

        {isAdmin ? (
          <div className="admin-acts">
            <Link
              to={`/candles/${actCandle._id}/edit`}
              className="admin-editbtn"
            >
              Edit
            </Link>
            <button className="admin-deletebtn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : null}

        <div className="candle-details-layout">
          {actCandle.image ? (
            <img
              src={actCandle.image}
              alt={actCandle.name}
              className="candle-details-image"
            />
          ) : null}

          <div className="candle-details-side">
            <div className="candle-info-card">
              {actCandle.price ? (
                <p className="candle-details-price">Price: {actCandle.price}</p>
              ) : null}

              <h3 className="candle-deDesc-title">Description</h3>
              <p className="candle-deDesc">
                {actCandle.description || "No description available 🫙"}
              </p>

              <p className="candle-shape">
                Shape: {actCandle.shape || "No data here ❌"}
              </p>

              <p className="candle-scent">
                Scent: {actCandle.scent || "No data here ❌"}
              </p>
            </div>

            <button
              className="add-to-cart details-addtocart"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart(e, "candles", actCandle)
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
    <div className="candle-page">
      <h1 className="candle-title"> Candles</h1>

      {isAdmin ? (
        <Link to="/candles/new" className="candle-addnew-btn">
          + Add New Candle
        </Link>
      ) : null}

      <div className="candles-grid">
        {candles.map((candle) => {
          return (
            <Link
              key={candle._id}
              to={`/candles/${candle._id}`}
              className="candle-link"
            >
              <div className="candle-card">
                <div className="candle-card-media">
                  {candle.image ? (
                    <img
                      src={candle.image}
                      alt={candle.name}
                      className="candle-image"
                    />
                  ) : null}
                </div>

                <div className="candle-card-body">
                  <h3 className="candle-name">{candle.name}</h3>

                  {candle.price ? (
                    <p className="candle-price">Price: {candle.price}</p>
                  ) : null}

                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addToCart(e, "candles", candle)
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

export default Candle
