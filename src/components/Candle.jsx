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

  return <></>
}

export default Candle
