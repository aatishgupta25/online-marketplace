import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  // let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      // navigate("/");

      window.location.pathname("/")

    });
  };

  return (
    <Router>
      {/* <div className="navbar"> */}
      <nav>
        {/* <Link to="/home"> Home </Link>
        <Link to="/createpost"> Create Post </Link> */}
        {/* <Link to="/home"> Home </Link> */}

        {/* <Link to="/home" className="link"> Listings </Link> */}


        {!isAuth ? (
          <>
            <Link to="/" className="link"> HomePage </Link>
            <Link to="/login" className="link"> Login </Link>
          </>

        ) : (
          <>
            <Link to="/home" className="link"> Listings </Link>
            <Link to="/createpost" className="link"> Create New Listing </Link>
            {/* <h2>{loggedinUser}</h2> */}

            <button onClick={signUserOut} className="logoutbtn"> Log Out</button>
          </>
        )}
      </nav>
      {/* </div> */}
      <Routes>

        <Route path="/" element={<Landing isAuth={isAuth} />} />
        <Route path="/home" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;