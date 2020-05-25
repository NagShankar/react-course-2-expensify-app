import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
//note: we are destructuring component from Route and renaming it as Component, just to avoid confusion, you can name it anything

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
    return (
        <Route {...rest} component={(props) => {
        
        //props here contain things like history,match.location etc which are inbuilt inside Route component which otherwise dont get if we do conditional rendering of Component(i.e renamed component) like below, Component is equal to PrivateRoute components like ExpenseDashboardPage, AddExpensePage and EditExpensePage
        
        return (
              isAuthenticated ? (
                <div> 
                  <Header />
                  <Component {...props} /> 
                 </div>  
              ) : (
                  <Redirect to="/" />
                )
            )
         }
        } />
  )};


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid //converting string to Boolean
});

export default connect(mapStateToProps)(PrivateRoute);

//Alternate solution 1.......................................

//export const PrivateRoute = (props) => (
//  props.isAuthenticated 
//  ? <Route {...props} />
//  : <Redirect to='/' />
//);


//Alternate solution 2.......................................

//export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => { 
// 
//  function checkAuthenticated (props) {
//    if (isAuthenticated) {
//      return (
//        <div>
//          <Header />
//          <Component {...props} />
//        </div>
//        );
// 
//    } else {
//      return <Redirect to="/" />;
//    }
//  }
// 
//  return (
//    <Route {...rest} component={(props) => checkAuthenticated(props)} />
//  );
//};
// 
//const mapStateToProps = state => ({
//  isAuthenticated: !!state.auth.uid,
//});
// 
//export default connect(mapStateToProps)(PrivateRoute);