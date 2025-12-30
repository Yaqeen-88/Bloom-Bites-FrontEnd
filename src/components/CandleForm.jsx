import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Bloom from "../services/api"

const CandleForm = ({user}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdmin = user && user.role === "admin"
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    scent: "",
    shape: ""
  })

  const getCandle = async () => {
    try {
      const response = await Bloom.get(`/candles/${id}`)

      const candle = response.data.candle ? response.data.candle : response.data
      setFormData({
        name: candle.name || "",
        description: candle.description || "",
        price: candle.price ?? "",
        image: candle.image || "",
        stock: candle.stock ?? "",
        scent: candle.scent || "",
        shape: candle.shape || ""
      })
    } catch (error) {
      console.log("An error happened while getting candle:", error);
    }
  }

  useEffect(() => {
    if (isEdit && user && isAdmin) {
      getCandle()
    }
  }, [id, isEdit, user, isAdmin])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) =>  ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) :value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(isEdit) {
        await Bloom.put(`/candles/${id}`, formData)
      } else {
        await Bloom.post("/candles", formData)
      }
      navigate("/candles")
    } catch (error) {
      console.log("An error happened saving candle:", error);

    }
  }

  return <></>
}

export default CandleForm
