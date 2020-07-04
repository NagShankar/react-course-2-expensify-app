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
    
          <Link className="list-item" to={`/edit/${id}`}>
            
            <div>
               <h3 className="list-item__title">{description} </h3>
               <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>
            
            <h3 className="list-item__data">Amount: {numeral(amount).format('$0,0.00')} </h3>

             {/* lets have remove button only when wants to edit an expense*/} 
         
          {/* 
              <button onClick={()=>{
                    dispatch(removeExpense({id:id})); //remove expense accepts "id" as an object, check actions/expenses.js for more details, using dispatch after destructuring which was available inside props as props.dispatch
               }}>Remove</button>

           */} 


           </Link>
         
         


         
     
  );    
}

//export default connect()(ExpenseListItem); //CONNECTING GIVE DISPATCH AS A PROP

export default ExpenseListItem;