import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogout }) => {
  let userOptions
  if(user) {
    userOptions = (
      <>
      {/* <h3>Welcome {user.name}!</h3> */}
      <Link to='/'>Home</Link>
      <Link onClick={handleLogout} to='/'>
        Sign Out
      </Link>
      </>
    ) }

    const publicOptions = (
      <>
      <Link to="/">Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='/signin'>Sign In</Link>
      </>
    )

return(
  <header>
    <Link to='/'>Bloom Bites
    </Link>
    <nav>
      {user ? userOptions : publicOptions}
    </nav>
  </header>
)
}

export default Nav







