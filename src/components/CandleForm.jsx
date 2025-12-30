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

  return <></>
}

export default CandleForm
