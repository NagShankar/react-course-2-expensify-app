import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //always recommnded to import third party libraries first and then import your app related
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import authReducer from "../reducers/auth";

//----------------------------------------STORE---------------------------------------------------
//------- STORE creation using combineReducers

//..........wrapping it up and exporting it as unnamed function
//export default () => {
//    const store=createStore(
//     combineReducers({
//       expenses: expensesReducer,
//       filters: filterReducer
//     })
//  );
//    
//  return store;
//
//}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //compose really doesnt exist, we are just using it if there's no dev tool

//..........wrapping it up and exporting it as named function
const configureStore = () => {
    const store=createStore(
     combineReducers({
       expenses: expensesReducer,
       filters: filterReducer,
       auth: authReducer
          }), 
        composeEnhancers(applyMiddleware(thunk)) //another way of using dev tool, by wrapping it in a function created above
       //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //enabling Redux dev tool for this store
  );
    
  return store;

}

export default configureStore;
