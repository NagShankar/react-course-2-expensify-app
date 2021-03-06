import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
//import { editExpense } from "./../actions/expenses";
import { startEditExpense } from "./../actions/expenses";
//import { removeExpense } from "./../actions/expenses";
import { startRemoveExpense } from "./../actions/expenses";

//previosly this was functional component, now changed to class for testing the unconnected version
export class EditExpensePage extends React.Component{
    
    onSubmission = (expense) => {
          //console.log(expense)
        //alert("hi")
          this.props.editExpense(this.props.expense.id, expense);
          this.props.history.push("/");
        }
    removeNow = (e) => {
         //alert("remove now")
          this.props.removeNow({ id: this.props.expense.id }); //remove expense action accepts "id" as an object, check actions/expenses.js for more details
          this.props.history.push("/"); //redirecting after deleting
        }
       
    render(){
        
         //console.log(this.props); //now props will have the matched expense inside props
        return(
                        
            <div>
            
            <div className="page-header">
               <div className="content-container">
                   <h1 className="page-header__title">Editing Expense for id: {this.props.match.params.id}</h1>
                </div>
            </div>
            
          <div className="content-container">
                <ExpenseForm 
                      expense={this.props.expense} /* passing the matched expense as a prop to ExpenseForm component which then can be used to set the default and populate the fields with that data */
                      onSubmission={this.onSubmission}
                />
               <button className="button button--secondary" onClick={this.removeNow}>Remove Expense</button>
          </div> 
            
          </div>
            
        );
    }
    
}


const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id; //returning the matched expense object from the expenses array
    }),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  removeNow: (data) => dispatch(startRemoveExpense( data )) //changed removeExpense(data) to startRemoveExpense(data), i.e we are dispatching async call here
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
