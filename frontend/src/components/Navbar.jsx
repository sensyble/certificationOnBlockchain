import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import axios from "axios";
import { authAction } from "../store";
axios.defaults.withCredentials=true

const Navbar = () => {

  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const sendLogoutReq = async() =>{
    const res = await axios.post("http://localhost:4000/api/logout", null, {
      withCredentials:true
    })

    if(res.status == 200){
      return res
    }
    return new Error ("unable to logout, try again")
  }

  const handleLogout = () =>{
    sendLogoutReq().then(()=>dispatch(authAction.logout()))
  }


  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            COB
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              {!isLoggedIn && 
              <>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/register">
                  Register
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              </>
              }
              {isLoggedIn && (
                <li class="nav-item">
                  <a onClick={handleLogout} class="nav-link" href="/">
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
