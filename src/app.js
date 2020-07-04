import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';


//importing CSS
import './styles/style.scss';
import 'normalize.css/normalize.css';

import "react-dates/lib/css/_datepicker.css"; //from ExpenseForm, to use in other components, just to avoid confusion of inporting it everywhere

//importing AppRouter
import AppRouter from './routers/AppRouter';
import { history } from './routers/AppRouter'; //importing ourn own history

//importing store, we are giving some random name, here configureStore, later using it to execute it as a function
import configureStore from './store/configureStore'

//importing action creators and filters
//import {addExpense} from './actions/expenses' //no more used here
//import {setTextFilter} from './actions/filters' //no more used here

import { startSetExpenses } from './actions/expenses'

//importing login and logout actions
import { login, logout } from './actions/auth'

//importing firebase
//import './firebase/firebase'; //we're importing this for CRUD operations testing inside firebase.js, which app.js requires in order to run that file from inside main application, just like we import playground/promises to play with it
import { firebase } from './firebase/firebase'; //we're importing this for checking tuthentication below

import LoadingPage from './components/LoadingPage';

//importing playground es6 promises
//import './playground/promises' //we're importing this for working with promises from playground file

//importing selectors to filter out data
//import getVisibleFilters from './selectors/expenses'; //no more used here

const store = configureStore(); //executing it as a function what we just imported
//console.log("testing"); //for source map testing
//..........................now we can access all those which are related to store

//console.log(store.getState());


//.....................now changing data using store dispatch

//store.dispatch(addExpense({
//    description:'Water Bill',
//    amount:4500,
// 
//}))
//store.dispatch(addExpense({
//    description:'Gas Bill',
//    createdAt:1000
//}))
//store.dispatch(addExpense({
//    description:'Rent',
//    amount:10500,
//  
//}))

//--------------Text Filter
//store.dispatch(setTextFilter("water"))

//checking that after connecting store to component the state should get updated for any dispatch and then mapStateToProps also get updated causing re-rendering to update the data
//setTimeout(()=>{
//   store.dispatch(setTextFilter("bill")) 
//}, 3000);


//...................filtering 

//const state = store.getState();//retrieving all details from store and saving it in state variable
//const filtered = getVisibleFilters(state.expenses, state.filters);
//console.log(filtered);

//console.log(store.getState());


//store ={store} i.e store={nameOfYourStore}
const jsx=(
    <Provider store={store}> 
         <AppRouter />
    </Provider>
    
);

//rendering based on login and logout
let hasRendered = false; //initial value
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
    
}

//rendering Loading... until data gets fetched
ReactDOM.render(
<LoadingPage />,
document.getElementById('app')
)

//after data loads, dispatch an action to display it 
//store.dispatch(startSetExpenses()).then(()=>{
//       //rendering
//        ReactDOM.render(
//        jsx,
//        document.getElementById('app')
//        )
//})

//checking authentication
firebase.auth().onAuthStateChanged((user)=>{   //onAuthStateChanged checks if user goes from authenticated to unauthenticated or vice versa
    if(user){
        //console.log(user); //details from firebase
        //console.log(user.uid); //user has unique user id
        store.dispatch(login(user.uid));//store user id in the store
        
        //we're dispatchng actions login and logout here because onAuthStateChanged loads first and checks if the user is already logged in or not, if logged in the uid will be already set, if we dispatch this action inside "startLogin" action then we set uid only after stratlogin get called, in this case it will not check if user is already logged in before itself and user is trying to just refresh the already logged in page
        
        console.log("you\'re logged in, woohoo");
        //now fetching data and rendering only when logged in
        store.dispatch(startSetExpenses()).then(()=>{
             //rendering
             //ReactDOM.render(jsx, document.getElementById('app'))
              renderApp();
              if(history.location.pathname === "/"){ //check location and then redirect to dashboard after logging in
                  history.push("/dashboard");
               }
           })
    }
    else{
        console.log("now you\'re logged out");
       //ReactDOM.render(jsx, document.getElementById('app'));//if you dont do this, user will be seeing Loading..., so we will render the app to redirect to see atleast login page, BUT we dont want to render every time, render only if not rendered, render ONLY ONE TIME, during login or during logout. When already logged in, and then when we logout, we just redirect to login page.
        store.dispatch(logout());//store user id in the store
        renderApp();
        history.push("/"); //push to login page when logged out, no matter wherever user is, in any page, it doesn't matter, he will be redirected to login page
    }
    
});


