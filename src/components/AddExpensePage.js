import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
//...........after adding middleware and modifying addExpense action creator
//import { addExpense } from "./../actions/expenses";
import { startAddExpense } from "./../actions/expenses";


//previosly this was functional component, now changed to class for testing the unconnected version
export class AddExpensePage extends React.Component{
    
    onSubmission = (expense) => {
        //console.log(expense);
        //props.dispatch(addExpense(expense));
         this.props.submitNow(expense);
         this.props.history.push(
          "/"
        ); /* routing back to dashboard page after submission using history given by react router */
      }
    
    render(){
        
        return(
         <div>
             <div className="page-header">
                <div className="content-container">
                       <h1 className="page-header__title">Add Expense</h1>
                </div>
              </div>
             <div className="content-container">
                 <ExpenseForm onSubmission={this.onSubmission} />
             </div>
         </div>
        
        );
    }
    
    
}


const mapDispatchToProps = (dispatch) => {
    return{
        submitNow : (expense) => dispatch(startAddExpense(expense)) //changed addExpense(expense) to startAddExpense(expense), i.e we are dispatching async call here
   }
}

export default connect(undefined, mapDispatchToProps)(AddExpensePage); //connect gives access to props which allow us to dispatch action
