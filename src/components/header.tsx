import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("guest_session_id");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/rated">
                Rated
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  className="btn btn-transparent"
                  style={{ color: "rgba(255, 255, 255, 0.55)" }}
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link className="nav-link" aria-current="page" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
