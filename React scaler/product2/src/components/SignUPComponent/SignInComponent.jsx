import { useState } from "react";
import "./SignUp.css";

const SignInComponent = () => { 
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const userNameHandler = (e) => setUserName(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const formHandler = () => console.log({ name, userName, password });

  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <div className="formContainer">       
        <div className="formItem">
          <label>User Name</label>
          <input placeholder="Enter UserName" onChange={userNameHandler} />
        </div>
        <div className="formItem">
          <label>Password</label>
          <input placeholder="Enter Password" onChange={passwordHandler} />
        </div>

        <div>
          <button className="submitButton" onClick={formHandler}> Sign In </button>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
