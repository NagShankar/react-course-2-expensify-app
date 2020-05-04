export default (expenses) => {
    
//...........TDD example, first write test cases and then solve it here to pass those test cases
    
//    if(expenses.length === 0){
//    return 0;    
//    }
//    else{
//       return expenses
//           .map((expense) => expense.amount).reduce((sum,val)=>sum + val, 0); 
//       }
    
    return expenses
     .map((expense) => expense.amount)
     .reduce((sum,val)=>sum + val, 0);
    
};