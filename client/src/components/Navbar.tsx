import "../styles/navbar.css"
import logo from "../assets/SCOPE__5_-removebg-preview.png"

export const Navbar = () => {
  return (
    <nav>
        <div className="nav-container">
            <a href="/" className="logo">
                <img src={logo} alt="" />
            </a>
            <div className="nav-items">
                <a href="">Pricing</a>
                <a href="">Articles</a>
                <a href="">About</a>
                <button type="button" className="btn btn-light" id="nav-login">
                  <a href="/login">Login</a>
                </button>
            </div>
        </div>
    </nav>
  )
}
