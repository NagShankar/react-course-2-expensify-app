import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { startLogout } from "./../actions/auth";

//this is Header component with header HTML tag
export const Header = ({ startLogout }) => (
<header>
    <h1>Expensify</h1> 
    
    <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
{/*<NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>*/} 
    <button onClick={startLogout}>Log Out</button>
    </header>
);

export default connect(undefined,{ startLogout })(Header); 

//current stucture inside database
//const db = {
//    expenses: {
//        expense1: {
//            
//        },
//        expense2: {
//            
//        }
//    }
//    
//}

//for different users
//const db = {
//    users : {
//        uid1 : {
//            
//         expenses: {
//                expense1: {
//
//                },
//                expense2: {
//
//               }
//            }
//                
//        },
//        uid2 : {
//            
//         expenses: {
//                expense1: {
//
//                },
//                expense2: {
//
//               }
//            }
//                
//        }
//        
//        
//    }
//    
//}