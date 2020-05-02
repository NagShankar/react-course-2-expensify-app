import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';

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


//..........wrapping it up and exporting it as named function
const configureStore = () => {
    const store=createStore(
     combineReducers({
       expenses: expensesReducer,
       filters: filterReducer
          }), 
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //enabling Redux dev tool for this store
  );
    
  return store;

}

export default configureStore;
