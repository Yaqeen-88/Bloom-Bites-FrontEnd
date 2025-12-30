import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Bloom from "../services/api"

const CakeForm = ({user}) => {
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
    flavour: ""
  })

  const getCake = async () => {
    try {
      const response = await Bloom.get(`/cake/${id}`)
      const cake = response.data.cake ? response.data.cake : response.data
        setFormData({
        name: cake.name || "",
        description: cake.description || "",
        price: cake.price ?? "",
        image: cake.image || "",
        stock: cake.stock ?? "",
        scent: cake.scent || "",
        shape: cake.shape || ""
      })
      console.log("cake response:", response.data);
    } catch (error) {
      console.log("An error happened while getting cake:", error);
    }
  }

  useEffect(() => {
    if (isEdit && user && isAdmin) {
      getCake()
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
        await Bloom.put(`/cake/${id}`, formData)
      } else {
        await Bloom.post("/cake", formData)
      }
      navigate("/cake")
    } catch (error) {
      console.log("An error happened saving cake:", error);
    }
  }
  if(!user) {
    return (
      <div className="cake-form-notauth">
        <p>You must sign in to access this page.</p>
        <Link to="/signin">Sign In</Link>
      </div>
    )
  }
  if (!isAdmin) {
    return (
      <div className="cake-form-forbdn">
        <p>You do not have permission to be here🙂</p>
        <Link to="/cake">Back to Cake</Link>
      </div>
    )
  }
  return (
  <div className="cake-form-page">
    <h1 className="cake-form-title">
      {isEdit ? "Edit Cake" : "Add New Cake"}
    </h1>
    <form className="cake-form" onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="cake name" value={formData.name} onChange={handleChange} required/>
      <input name="flavour" placeholder="flavour" value={formData.flavour} onChange={handleChange} required/>
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>

      <div className="cake-form-act">
        <button type="submit">
          {isEdit ? "Update Cake" : "Create Cake"}
        </button>

        <Link to="/cake">Cancel</Link>
      </div>

    </form>
  </div>
)
}
export default CakeForm


