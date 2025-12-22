import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

return (
  <>
  <button onClick={() => navigate('/signin')}>Click Here to Start</button>
  </>

)
}

export default Home
