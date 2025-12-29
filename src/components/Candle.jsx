import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Bloom from "../services/api"

const Candle = () => {
  const { id } = useParams()

  const [candles, setCandles] = useState([])
  const [actCandle, setActCandle] = useState(null)
  const [loading, setLoading] = useState(true)

  return <></>
}

export default Candle
