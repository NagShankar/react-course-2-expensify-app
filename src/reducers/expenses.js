//no dependecy here to import anything because reducers are PURE functions


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


export default expensesReducer;