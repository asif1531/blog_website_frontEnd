import { AuthContext } from "./auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export {RedirectForLogin};
function RedirectForLogin({children}) {
  const userInfo = useContext(AuthContext);

  const authToken = localStorage.getItem('authToken');

  let isTokenActive = false;

  let decoded;

  if (authToken) {
    decoded = jwt_decode(authToken);
    console.log("Decoded jwt token....",decoded);
    let expiryTime = decoded.exp * 1000;
    let currentTime = Date.now();
    
    if (currentTime < expiryTime) {
      isTokenActive = true;
    }
  }

  console.log("Auth token inside privateRoute from local storage: ",authToken);

  // if (!userInfo.authToken) {
  //   return <Navigate to="/" />
  // } 
  if (authToken && isTokenActive) {
    return <Navigate to="/blogs" />
  }

  return children;

}