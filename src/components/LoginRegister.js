import React, { Component } from "react";
import login from "../assets/login.svg";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import RegisterModal from "./RegisterModal";
import axios from "axios";
import LoginModal from "./LoginModal";
import { AuthContext } from "../auth";
export class LoginRegister extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      nameForRegister: "",
      emailForRegister: "",
      passwordForRegister: "",
      genderForRegister: "",
      interestsForRegister: "",
      emailForLogin: "",
      passwordForLogin: "",
    };
  }

  toggleLoginModal = () => {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen,
    });
  };

  toggleRegisterModal = () => {
    this.setState({
      isRegisterModalOpen: !this.state.isRegisterModalOpen,
    });
  };

  onValueChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  onRegisterSubmit = async () => {
    //Cricket, Politics, Lifestyle
    const interestsArray = this.state.interestsForRegister.split(",");
    if (
      !this.state.nameForRegister ||
      !this.state.emailForRegister ||
      !this.state.passwordForRegister
    ) {
      alert("Required input are not given");
      return;
    }
    const data = {
      name: this.state.nameForRegister,
      email: this.state.emailForRegister,
      password: this.state.passwordForRegister,
      gender: this.state.genderForRegister,
      interests: interestsArray,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createUser",
        data
      );
      alert("User created successfully");
      this.toggleRegisterModal();
    } catch (err) {
      alert("User registration failed");
    }
  };

  onLoginSubmit = async () => {
    if (!this.state.emailForLogin || !this.state.passwordForLogin) {
      alert("Required inputs are not given");
      return;
    }
    const data = {
      emailId: this.state.emailForLogin,
      password: this.state.passwordForLogin,
    };

    try {
      const loginResponse = await axios.post(
        "http://localhost:5000/api/loginUser",
        data
      );
      console.log("Login Api response.......", loginResponse.data);
      if (loginResponse.data.status == "error") {
        alert(`Login failed, reason: ${loginResponse.data.message}`);
      } else {
        alert("Login successful");
        localStorage.setItem("userEmailId", loginResponse.data.message.emailId);
        localStorage.setItem("authToken", loginResponse.data.message.token);
        localStorage.setItem("userId", loginResponse.data.message.userId);
        localStorage.setItem("interests", loginResponse.data.message.interests);
        this.context.setAuthToken(loginResponse.data.message.token);
        this.context.setUserEmailId(loginResponse.data.message.emailId);
        this.context.setUserId(loginResponse.data.message.userId);
        this.toggleLoginModal();
      }
    } catch (err) {
      console.log("Error from api....", err);
      alert("Login failed:(");
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6" style={{ paddingTop: "10%" }}>
            <img src={login} alt="loginImage" />
          </div>

          <div className="col-6" style={{ padding: "10%" }}>
            <h4>A blog website</h4>
            <p>A place to explore through blogs.....</p>
            <Button
              style={{
                backgroundColor: "#6C63FF",
                width: "75%",
                color: "white",
              }}
              onClick={this.toggleLoginModal}
            >
              Login
            </Button>
            <br /> <br /> <br />
            <Button
              style={{
                backgroundColor: "#6C63FF",
                width: "75%",
                color: "white",
              }}
              onClick={this.toggleRegisterModal}
            >
              Register
            </Button>
          </div>
        </div>

        <LoginModal
          isLoginModalOpen={this.state.isLoginModalOpen}
          toggleLoginModal={this.toggleLoginModal}
          onValueChange={this.onValueChange}
          onLoginSubmit={this.onLoginSubmit}
        />
        <RegisterModal
          isRegisterModalOpen={this.state.isRegisterModalOpen}
          toggleRegisterModal={this.toggleRegisterModal}
          onValueChange={this.onValueChange}
          onRegisterSubmit={this.onRegisterSubmit}
        />
      </div>
    );
  }
}

export default LoginRegister;
