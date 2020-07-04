import React from "react";
import { connect } from "react-redux";
import { startLogin } from "./../actions/auth";

export const Login = ({ startLogin }) => { //if you import this then you need curly braces in file which you're importing because its named export
    return(
      <div className="box-layout"> 
        <div className="box-layout__box">
         <h1 className="box-layout__title">Welcome To Expensify</h1>
          <h5>Please Login Below To Know Your Expenses</h5>
           <button className="button" onClick={startLogin}>Login (Google)</button> 
        </div>
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