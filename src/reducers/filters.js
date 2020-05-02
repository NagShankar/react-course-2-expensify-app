//no dependecy here to import anything because reducers are PURE functions
import moment from 'moment';

//Filter Reducer
const filterReducerDefaultState = {
        text: '', //filtering based on some user keyword like rent or anything
        sortBy: 'date', //date or amount
        startDate: moment().startOf('month'), //before it was undefined 
        endDate: moment().endOf('month') //before it was undefined 
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


export default filterReducer;