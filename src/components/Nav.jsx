import { Link } from "react-router-dom"
import "../App.css"

const Nav = ({ user, handleLogout, cartCount }) => {
  let userOptions
  if (user) {
    userOptions = (
      <div className="nav-links">
      <Link to='/' className="nav-link">Home</Link>

      <Link to="/cart" className="nav-cart">
      <span className="nav-carticon">🛒</span>
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
      <div className="nav-left">
      <img src="https://i.imgur.com/Sziqx4n.png" alt="bloom-bites logo" height= "100"/>
      <Link to="/" className="nav-logo">Bloom Bites</Link>
      </div>
      <nav className="nav-navi">{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
