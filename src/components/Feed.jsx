
import {useNavigate} from 'react-router-dom'

const Feed = ({ user }) => {
  const navigate = useNavigate()

return user ? (
  <h1>Hi user</h1>
): (
  <>
  <h3>Oops! You need to Sign In</h3>
  <button onClick={() => navigate("/signin")}>Sign In</button>
  </>
)
}

export default Feed
