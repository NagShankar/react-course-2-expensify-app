console.log("HOC example")

//Its a component(HOC) that renders another component
//Goal of HOC is reusing code
//Render hijacking
//Prop manipulation
//Abstract State

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
<div>
    <h1>info</h1>
    <p>this info is: {props.info}</p>
    
    </div>

);

const withAdminWarning = (WrappedComponent) => { //function taking a component as a argument and returns higher order component like below
    return (props) => { //this is an HOC which is stateless component here
        return (
        <div>
            {props.isAdmin && <p>This is a private message</p>} 
            <WrappedComponent {...props}/> {/* passing props related to this component otherwise any props  belonging to this wouldn't display */}
            </div>
        
        );
    }
};

const AdminInfo = withAdminWarning(Info); //retuned component from above is store in AdminInfo which is the New or the Enhanced component
      
//here we are passing additional props like isAdmin which is specific to HOC and      
//ReactDOM.render(<AdminInfo isAdmin={true}  info="there are the details"/>, document.getElementById('app'));



const requireAuthentication = (WrappedComponent) => {
    
    return (props) => {
        return (
        <div>
                    
          {props.isAuthenticated ?  <WrappedComponent {...props}/> : <h3>Hello! Please login to see the info</h3>}
           
           
            
        </div>
        
        
        );
    }
    
}
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true}  info="there are the details"/>, document.getElementById('app'));