import { Link } from "react-router-dom"
import '../App.css'

const Nav = ({ user, handleLogout, cartCount }) => {
  let userOptions
  if (user) {
    userOptions = (
      <div className="nav-links">
      <Link to='/' className="nav-link">Home</Link>

      <Link to="/cart" className="nav-cart">
      :shopping_trolley:
      {cartCount > 0 ? (
        <span className="cart-count">{cartCount}</span>
      ): null}
      </Link>
      <Link onClick={handleLogout} to='/' className="nav-link">
        Sign Out
      </Link>
      </div>
    )
  }

  const publicOptions = (
    <div className="nav-links">

      <Link to="/register" className="nav-link">Register</Link>
      <Link to="/signin" className="nav-link">Sign In</Link>

    </div>
  )

  return (
    <header className="nav-header">
      <Link to="/" className="nav-logo">Bloom Bites</Link>
      <nav className="nav-navi">{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav







