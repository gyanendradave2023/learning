import { useState } from "react";
import "./SignUp.css";

const SignUpComponent = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const inputHandler = (fieldName) => (e) =>{
    // console.log(e.target.id, e.target.value);
    setformData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const formHandler = () => console.log(formData);

  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <div className="formContainer">
        <div className="formItem">
          <label>Name</label>
          <input placeholder="Enter Name" id="name" onChange={inputHandler('name')} />
        </div>
        <div className="formItem">
          <label>E-mail</label>
          <input
            placeholder="Enter E-mail"
            id="email"
            onChange={inputHandler('email')}
          />
        </div>
        <div className="formItem">
          <label>User Name</label>
          <input
            placeholder="Enter UserName"
            id="userName"
            onChange={inputHandler('userName')}
          />
        </div>
        <div className="formItem">
          <label>Password</label>
          <input
            placeholder="Enter Password"
            id="password"
            onChange={inputHandler('password')}
          />
        </div>

        <div>
          <button className="submitButton" onClick={formHandler}>
            Ragister
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
