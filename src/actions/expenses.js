import uuid from 'uuid4';
import database from "../firebase/firebase";

//component calls action generators/creators
//action creators/generators returns an object
//component then takes that object and dispatch it
//then the redux store changes


//ADD_EXPENSE action creator
//export const addExpense = ({description='', note='', amount=0, createdAt=0}={}) => {
//    return {
//        type:"ADD_EXPENSE",
//        expense:{
//            id:uuid(),
//            description, //or description= description, or use shortand property
//            note,
//            amount,
//            createdAt
//        }
//        
//    }
//}

//modifying ADD_EXPENSE action creator after applying middleware
export const addExpense = (expense) => {
    return {
        type:"ADD_EXPENSE",
        expense
    }
    
}

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
    const { description='', note='', amount=0, createdAt=0 } = expenseData; //just another way of setting up default if expenseData is an empty object
    const expense = { description, note,  amount, createdAt}; //instead of pushin the values we just destrcutured above individually, place it inside variable and use it for pushing
        
    return database.ref("expenses").push(expense).then((ref)=>{
        dispatch(addExpense({
            id:ref.key,     //getting id from key created by firebase after PUSH method
            ...expense
        }))
    })    
    //*************************NOTE:we are returning this for testing purpose, so we can chain "then" call for the then returned here    
    }
    
}


//***************************************Add expense middleware modifiction ends here




//REMOVE_EXPENSE
export const removeExpense = ({id}={}) => {
    return {
        type:"REMOVE_EXPENSE",
        id //or id:id
        
    }
}



//EDIT_EXPENSE
export const editExpense = (id, updates) => {
    return {
        type:"EDIT_EXPENSE",
        id,
        updates
        
    }
}


//we are doing named export