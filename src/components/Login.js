import React from "react";
import { connect } from "react-redux";
import { startLogin } from "./../actions/auth";

export const Login = ({ startLogin }) => { //if you import this then you need curly braces in file which you're importing because its named export
    return(
      <div> 
         <h1>Welcome To Expensify App</h1>
          <h5>Please Login Below</h5>
           <button onClick={startLogin}>Login</button> 
        </div>
    
    )
}

//OR... if you want to use mapDispatchToProps
//const mapDispatchToProps = (dispatch) => {
//    return {
//        startLogin: () => dispatch(startLogin())
//    }
//}

export default connect(null,{ startLogin })(Login); //no need of curly braces for this while importing