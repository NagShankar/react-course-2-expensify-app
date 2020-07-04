import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getVisibleFilters from './../selectors/expenses'
import selectExpensesTotal from './../selectors/expenses-total'
import '../locales/inr.js';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => { 
    numeral.locale('inr');
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal).format('$0,0.00');
    
  return(
     <div className="page-header">
       <div className="content-container">
        <h3 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h3>
      <div className="page-header__actions">
         <Link className="button" to="/create" activeClassName="is-active">Create Expense</Link>
      </div>
      </div>
      </div>
  );

}

const mapStateToProps = (state)=> { //first argument is the state from the store, can be given any name
   
    const visibleExpenses = getVisibleFilters(state.expenses, state.filters);
    
    return{
     
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
       
    };
};

export default connect(mapStateToProps)(ExpensesSummary);



//...............alternate solution...............my solution

//export const ExpensesSummary = (props) => {
//    
//const calculateTotal = (expenses) => {
//    
//            return expenses
//            .map((expense) => expense.amount)
//            .reduce((sum,val)=>sum + val, 0); 
//
//    
//}   
//    
//return (
//    <div>
//      <h5>Viewing {props.expenses.length} expenses totalling $94</h5>
//       {  
//          calculateTotal(props.expenses) 
//       }
//    </div>
//   );
//}
//
//const mapStateToProps = (state)=> { //first argument is the state from the store, can be given any name
//    return{
//     
//        expenses:getVisibleFilters(state.expenses, state.filters),
//       
//    };
//};
//
//export default connect(mapStateToProps)(ExpensesSummary);