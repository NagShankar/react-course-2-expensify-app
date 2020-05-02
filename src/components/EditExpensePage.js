import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "./../actions/expenses";

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
           Editing Expense for id: {this.props.match.params.id}
                <ExpenseForm 
                      expense={this.props.expense} /* passing the matched expense as a prop to ExpenseForm component which then can be used to set the default and populate the fields with that data */
                      onSubmission={this.onSubmission}
                />
               <button onClick={this.removeNow}> Remove </button>
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
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeNow: (data) => dispatch(removeExpense( data ))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
