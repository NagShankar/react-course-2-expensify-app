import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { startLogout } from "./../actions/auth";

//this is Header component with header HTML tag
export const Header = ({ startLogout }) => (
<header className="header">
       <div className="content-container">
    <div className="header__content">
    <Link to="/dashboard" className="header__title"><h1>Expensify</h1> </Link>
    {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> */}
{/*<NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>*/} 
    <button className="button-link-modify" onClick={startLogout}>Log Out</button>
     </div>
    </div>
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