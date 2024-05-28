import "../styles/navbar.css"

export const Navbar = () => {
  return (
    <nav>
        <div className="nav-container">
            <a href="" className="logo">
                SCOPE
            </a>
            <div className="nav-items">
                <a href="">Pricing</a>
                <a href="">Articles</a>
                <a href="">About</a>
                <button type="button" className="btn btn-light">Login</button>
            </div>
        </div>
    </nav>
  )
}
