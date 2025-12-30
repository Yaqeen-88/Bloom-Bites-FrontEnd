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

  if(!user) {
    return (
      <div className="candle-form-notauth">
        <p>You must sign in to access this page.</p>
        <Link to="/signin">Sign In</Link>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="candle-form-forbdn">
        <p>You do not have permission to be here 🙂</p>
        <Link to="/candles">Back to Candles</Link>
      </div>
    )
  }

  return (
  <div className="candle-form-page">
    <h1 className="candle-form-title">
      {isEdit ? "Edit Candle" : "Add New Candle"}
    </h1>

    <form className="candle-form" onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Candle name" value={formData.name} onChange={handleChange} required/>

      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />

      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />

      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />

      <input name="scent" placeholder="Scent" value={formData.scent} onChange={handleChange} />

      <input name="shape" placeholder="Shape" value={formData.shape} onChange={handleChange} />

      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>

      <div className="candle-form-act">
        <button type="submit">
          {isEdit ? "Update Candle" : "Create Candle"}
        </button>

        <Link to="/candles">Cancel</Link>
      </div>
    </form>
  </div>
)
}

export default CandleForm
