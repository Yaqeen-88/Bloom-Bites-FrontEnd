import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Bloom from "../services/api"

const Candle = () => {
  const { id } = useParams()

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
        for (let i=0; i < list.length; i++) {
          if (list[i]._id === id) {
            here = list[i]
            break
          }
        }
        setActCandle(here)
      }

      setLoading(false)
    } catch (error) {
      console.log("Error! Something happened getting candles", error);
      setLoading(false)
    }
  }

  useEffect(() => {
    getCandles()
  }, [id])

  if (loading) {
    return <p className="candle-loading">Loading candles....</p>
  }

  if (id) {
    if (!actCandle) {
      return (
        <div className="candle-notfound">
          <p>Candle not found. 🥺</p>
          <Link to="/candles" className="candle-goback" >
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

        {actCandle.image ?
        (
          <img src={actCandle.image} alt={actCandle.name} className="candle-details-image" />
        ): null}

        {actCandle.price ? (
          <p className="candle-details-price">
            Price: {actCandle.price}
          </p>
        ): null}

        <h3 className="candle-deDesc-title">Description</h3>
        <p className="candle-deDesc">
          {actCandle.description ? actCandle.description : "No description available 🫙"}
        </p>
        <p className="candle-shape">
          Shape: {actCandle.shape ? actCandle.shape : "No data here ❌"}
        </p>
        <p className="candle-scent">
          Scent: {actCandle.scent ? actCandle.scent : "No data here ❌"}
        </p>
      </div>
    )
  }

  return <></>
}

export default Candle
