import { useState, useEffect} from 'react'
import { useParams, useNavigate, Link} from "react-router-dom"
import Bloom from '../services/api'

const FlowerForm = ({user}) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const isAdmin = user && user.role === "admin"
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name:"",
    description:"",
    stock:0,
    color:"",
    flowerArrangement:"",
    price:"",
    image:"",
  })
  const getFlower = async () => {
    try{
      const response = await Bloom.get(`/flowers/${id}`)
      const flower = response.data.flower ? response.data.flower : response.data
      setFormData({
        name: flower.name ||"",
        description: flower.description ||"",
      stock: flower.stock ??"",
  color: flower.color ||"",
flowerArrangement: flower.flowerArrangement ||"",
price: flower.price ??"",
image: flower.image ||""   })
console.log("flower response:", response.data)
    } catch (error) {
      console.log("An error happened while getting flower:", error)
    }
  }
  useEffect(() => {
    if(isEdit && user && isAdmin){
      getFlower()
    }
  }, [id, isEdit, user, isAdmin])
  const handleChange = (e) => {
    const {name,value,type} = e.target
        setFormData((prev) => ({...prev, [name]:type === "number" ? (value === "" ? "": Number(value)) :value}))
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      if(isEdit){
        await Bloom.put(`/flowers/${id}`, formData)
      } else {
        await Bloom.post("/flowers", formData)
      }
      navigate("/flowers")
    } catch (error) {
      console.log("An error happened saving flower:", error)
    }
  }

  if(!user){
    return(
      <div className='flower-form-notauth'>
        <p>You must sign in to access this page.</p>
        <Link to='/signin'>Sign In</Link>
      </div>
    )
  }
  if(!isAdmin){
    return(
      <div className='flower-form-forbdn'>
        <p>You do not have permission to be here🙂</p>
        <Link to='/flowers'>Back to Flowers</Link>
      </div>
    )
  }
  return(
    <div className="flower-form-page">
      <h1 className='flower-form-title'>
{isEdit ? "Edit Flower" : "Add New Flower"}
      </h1>

<form className='flower-form' onSubmit={handleSubmit}>
  <input name="name" type="text" placeholder="Flower name"
  value={formData.name} onChange={handleChange} required />

  <textarea name="description" placeholder="Description"
  value={formData.description} onChange={handleChange} required />

  <input type="number" name="stock" placeholder="Stock"
  value={formData.stock} onChange={handleChange} required />

  <input name="color" type="text" placeholder="color"
  value={formData.color} onChange={handleChange} required />

  <input name="flowerArrangement" type="text" placeholder="flowerArrangement"
  value={formData.flowerArrangement} onChange={handleChange} required />

  <input name="price" type="number" placeholder="Price"
  value={formData.price} onChange={handleChange} required />

  <input type="text" name="image" placeholder="Image URL"
  value={formData.image} onChange={handleChange} required />
<div className='flower-form-act'>
  <button type="submit">
    {isEdit ? "Update Flower" : "Create Flower"}
    </button>
<Link to="/flowers">Cancel</Link>
</div>
</form>
    </div>
  )
}

export default FlowerForm
