import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
    return (
        <Route {...rest} component={(props) => {
        
        //props here contain things like history,match.location etc which are inbuilt inside Route component which otherwise dont get if we do conditional rendering of Component(i.e renamed component) like below, Component is equal to PublicRoute components like Login component
        
        return (
              isAuthenticated ? (
                   <Redirect to="/dashboard" />
              ) : (
                 <Component {...props} /> 
                )
            )
         }
        } />
  )};


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);