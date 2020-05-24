import React from "react";

//importing Router related
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom'; //now we want Router instead of BrowserRouter

//For our own history
import { createBrowserHistory } from 'history'; //install npm history

//importing all components
import Login from '../components/Login'; //using conencted version here, if we use { Login } then we get unconnected version
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
//import Header from '../components/Header'; //now using inside PrivateRoute
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

//private route import
import PrivateRoute from './PrivateRoute';

//create own history
export const history = createBrowserHistory(); //exporting to use history everywhere in the application

const AppRouter = () => (

//BrowserRouter has in-built browser history used for redirecting
    
//<BrowserRouter>
//    <Header />
//    <Switch>
//      <Route path="/" component={Login} exact={true}/>
//      <Route path="/dashboard" component={ExpenseDashboardPage}/>
//      <Route path="/create" component={AddExpensePage}/>
//      <Route path="/edit/:id" component={EditExpensePage}/>
//      <Route path="/help" component={HelpPage}/>
//      <Route component={NotFoundPage}/>
//     
//     </Switch>
//    </BrowserRouter>
    
    
//Switching to Router which has history prop instead of BrowserRouter which gives ability to add own history which we created
    
//using PrivateRoute instead of Route for those which are private pages    
    
<Router history={history}>
   
    <Switch>
      <Route path="/" component={Login} exact={true}/>
      <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
      <PrivateRoute path="/create" component={AddExpensePage}/>
      <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
      <Route path="/help" component={HelpPage}/>
      <Route component={NotFoundPage}/>
     
     </Switch>
    </Router>    

    
);

export default AppRouter;



