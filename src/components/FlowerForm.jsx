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
    flowerType:"",
    color:"",
    flowerArrangement:"",
    price:"",
    image:"",
  })
  const getFlower = async () => {
    try{
      const response = await Bloom.get(`/flowers/${id}`)
      setFormData(response.data)
    } catch (error) {
      console.log("An error happened while getting candle:", error)
    }
  }
  useEffect(() => {
    if(isEdit){
      getFlower()
    }
  }, [id, isEdit])
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
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
      console.log("An error happened saving candle:", error)
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
      <h1 className='candle-form-title'>
{isEdit ? "Edit Flower" : "Add New Flower"}
      </h1>

<form className='flower-form' onSubmit={handleSubmit}>
  <input name="name" type="text" placeholder="Flower name"
  value={formData.name} onChange={handleChange} required />

  <textarea name="description" placeholder="Description"
  value={formData.description} onChange={handleChange} required />

  <input type="number" name="stock" placeholder="Stock"
  value={formData.stock} onChange={handleChange} required />

  <input name="flowerType" type="text" placeholder="flowerType"
  value={formData.flowerType} onChange={handleChange} required />

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
