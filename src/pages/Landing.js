import React from 'react'
import { useNavigate } from "react-router-dom";
import './Landing.css'

function Landing({ isAuth }) {

    let navigate = useNavigate();

    const ViewListing = async () => {
        navigate("/home");
    }
    const Login = async () => {
        navigate("/login");
    }

    return (
        <div className="land">
            <div className="block">
                <h1 className="ctr">
                    Welcome to <h4>BuySell</h4>
                </h1>
                <h2>
                    Your one-stop shop for Buying and Selling Products
                </h2>
                <h2>
                    <button onClick={ViewListing} className="viewListing">
                        View Listings
                    </button>
                </h2>
                <h2 className="login">
                    To sell products, Please Login
                </h2>
                <h2 className="loginbtn">
                    <button onClick={Login} className="viewListing">
                        Login
                    </button>
                </h2>
            </div>
        </div>

    )
}

export default Landing



