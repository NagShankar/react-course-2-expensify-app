import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';


//importing CSS
import './styles/style.scss';
import 'normalize.css/normalize.css';

import "react-dates/lib/css/_datepicker.css"; //from ExpenseForm, to use in other components, just to avoid confusion of inporting it everywhere

//importing AppRouter
import AppRouter from './routers/AppRouter';

//importing store, we are giving some random name, here configureStore, later using it to execute it as a function
import configureStore from './store/configureStore'

//importing action creators and filters
import {addExpense, removeExpense, editExpense} from './actions/expenses'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters'


//importing selectors to filter out data
import getVisibleFilters from './selectors/expenses';

const store = configureStore(); //executing it as a function what we just imported

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

//rendering
ReactDOM.render(
jsx,
document.getElementById('app')
)


