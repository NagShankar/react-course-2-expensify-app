import React from "react";
//import { connect } from 'react-redux';
//import { removeExpense } from './../actions/expenses'
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import '../locales/inr.js';

//now destructuring instead od taking props
const ExpenseListItem = ({id, description, amount, createdAt}) => {
    numeral.locale('inr');
  return(
    <div>
          <Link to={`/edit/${id}`}><h3>{description} </h3></Link>
          <h4>Amount: {numeral(amount).format('$0,0.00')} Created: {moment(createdAt).format('MMMM Do, YYYY')}</h4>
         
          {/* lets have remove button only when wants to edit an expense*/} 
         
          {/* 
              <button onClick={()=>{
                    dispatch(removeExpense({id:id})); //remove expense accepts "id" as an object, check actions/expenses.js for more details, using dispatch after destructuring which was available inside props as props.dispatch
               }}>Remove</button>

           */} 
      </div>
  );    
}

//export default connect()(ExpenseListItem); //CONNECTING GIVE DISPATCH AS A PROP

export default ExpenseListItem;