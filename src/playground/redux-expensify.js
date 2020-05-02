console.log("from redux expensify");

import { createStore, combineReducers } from 'redux';
import uuid from 'uuid4';

//const demoState = {
//  expenses: [
//      {
//          id:"abc",
//          description:"April Rent",
//          note:"My final rent for April month",
//          amount:8925,
//          createdAt:0
//      }
//  ],
//    filters: {
//        text: 'rent',//filtering based on some user keyword like rent or anything
//        sortBy: 'amount', //date or amount
//        startDate:undefined,
//        endDate:undefined
//    }
//    
//};


//----------------------------------------ACTION CREATORS---------------------------------------------------

//ADD_EXPENSE action creator
const addExpense = ({description='', note='', amount=0, createdAt=0}={}) => {
    return {
        type:"ADD_EXPENSE",
        expense:{
            id:uuid(),
            description, //or description= description, or use shortand property
            note,
            amount,
            createdAt
        }
        
    }
}


//REMOVE_EXPENSE
const removeExpense = ({id}={}) => {
    return {
        type:"REMOVE_EXPENSE",
        id //or id:id
        
    }
}



//EDIT_EXPENSE
const editExpense = (id, updates) => {
    return {
        type:"EDIT_EXPENSE",
        id,
        updates
        
    }
}



//SET_TEXT_FILTER
const setTextFilter = (text="") => {
    return {
        type:"SET_TEXT_FILTER",
        text
    }
}


//SORT_BY_DATE
const sortByDate = () => {
    return {
        type:"SORT_BY_DATE",
        
    }
}


//SORT_BY_AMOUNT
const sortByAmount = () => {
    return {
        type:"SORT_BY_AMOUNT",
        
    }
}


//SET_START_DATE
const setStartDate = (sDate) => {
    return {
        type:"SET_START_DATE",
        sDate
    }
}


//SET_END_DATE
const setEndDate = (eDate) => {
    return {
        type:"SET_END_DATE",
        eDate
    }
}


//----------------------------------------REDUCERS---------------------------------------------------
//Expense Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state=expensesReducerDefaultState, action) => {
  switch(action.type){
      case 'ADD_EXPENSE' :
          //return state.concat(action.expense), lets use SPEARD syntax like below
          return [
              ...state,
              action.expense
          ]
      case 'REMOVE_EXPENSE':
          return state.filter((expense)=>{
                  return expense.id !== action.id
              })
          
      case 'EDIT_EXPENSE':
          return state.map((expense)=>{
                  if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }                     
                   }else{
                      return expense
                  }
              })
                 
      default:
          return state;
  }  
};


//Filter Reducer
const filterReducerDefaultState = {
        text: '', //filtering based on some user keyword like rent or anything
        sortBy: 'date', //date or amount
        startDate: undefined,
        endDate: undefined
    };

const filterReducer = (state=filterReducerDefaultState, action) => {
  switch(action.type){
          
         case 'SET_TEXT_FILTER':
          return {
              ...state,
              text:action.text
          }
          
          case 'SORT_BY_DATE':
          return {
              ...state,
              sortBy:"date"
              
          }
              
          case 'SORT_BY_AMOUNT':
          return {
              ...state,
            sortBy:"amount"
          }
             
         case 'SET_START_DATE':
          return {
              ...state,
            startDate:action.sDate
          }  
          
          case 'SET_END_DATE':
          return {
              ...state,
            endDate:action.eDate
          }  
          
          
      default:
          return state;
  }  
};


//----------------------------------------STORE---------------------------------------------------
//------- STORE creation using combineReducers
const store=createStore(
   combineReducers({
       expenses: expensesReducer,
       filters: filterReducer
   })
      

);


//-------subscribing to get notified when store changes


const getVisibleFilters = ((expenses, {text, sortBy, startDate, endDate}) => {
    
    
/*  

In your filters, startDate and endDate can be undefined. In the case that the startDate or endDate for your filters is undefined, you do not want to filter out any data based on that criteria. If startDate is undefined, typeof startDate !== 'number' will be true, and startDateMatch will be true.

In the case that you provide a number to startDateMatch, that means that you do want to filter by date. That means that the first part of your or (||) condition will be false and you will be checking for a match with the second part of the condition (whether the expense date comes before or after the start/endDate).

In short, undefined start and end dates will have typeof date !== 'number' be true and let all data pass through the filter (assuming the expense meets the other criteria as well!!). Start dates and end dates with values will have this condition be false, and you will filter the expenses based on createdAt.

*/
    
    
    return expenses.filter((expense)=>{
        
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
                       
        return startDateMatch && endDateMatch && textMatch
    }).sort((a,b) => {
      if(sortBy==="date"){
          return a.createdAt < b.createdAt ? 1 : -1
      }
        else if(sortBy==="amount"){
          return a.amount < b.amount ? 1 : -1
      }
        
    })
});

store.subscribe(()=>{
    //console.log(store.getState());
    const state= store.getState();
    const visibleFilters = getVisibleFilters(state.expenses, state.filters);
    console.log(visibleFilters); 
    
})


//----------------------------------------ACTIONS---------------------------------------------------

//ACTIONS, note that each dispatch action returns an object, here we're returning that object from Action Creators instead of Action

//----------------------------------addExpense
const expense1 = store.dispatch(addExpense({
    description:'April Rent',
    amount:1000,
    createdAt:-2000
}))
const expense2 = store.dispatch(addExpense({
    description:'Computer Purchase',
    amount:300,
    createdAt:-1000
}))

//console.log(expense1)
//console.log(expense2)


//----------------------------------removeExpense
//store.dispatch(removeExpense({id: expense2.expense.id}))

//----------------------------------editExpense
//store.dispatch(editExpense(expense1.expense.id,{amount:10000000}))

//----------------------------------setFilter
//--------------Text Filter
//store.dispatch(setTextFilter("rent"))
//store.dispatch(setTextFilter(""))

//--------------Date Filter
//store.dispatch(sortByDate())

//--------------Amount Filter
store.dispatch(sortByAmount())

//--------------Set Start Date Filter
//store.dispatch(setStartDate(0)) //start date at 125
//store.dispatch(setStartDate())  //start date at undefined

//--------------Set End Date Filter
//store.dispatch(setEndDate(999)) //end date at 1250













//examples to try

//const user = {
//    name:"nag",
//    age:27
//}
//
//console.log({
//    ...user,
//    name:"marc marquez",
//   location:"rajajianagar"
//})
//















