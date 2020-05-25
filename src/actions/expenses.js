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
    return (dispatch, getState) => {
    const uid = getState().auth.uid;//thunk takes second argument getState, using that we can fetch uid of that particular user
    const { description='', note='', amount=0, createdAt=0 } = expenseData; //just another way of setting up default if expenseData is an empty object
    const expense = { description, note,  amount, createdAt}; //instead of pushin the values we just destrcutured above individually, place it inside variable and use it for pushing
    
    //instead of wrtigin to "expenses" we go inside particular user and write the there, before -> database.ref("expenses").push(expense)...     
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
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

export const startRemoveExpense = ({id}={}) => {
    return (dispatch, getState) => {
    const uid = getState().auth.uid;//thunk takes second argument getState, using that we can fetch uid of that particular user 
       return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        }).catch((e)=>{
            alert("error")
        })
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

//this is async call which finally dispatches above action to store the data in store
export const startEditExpense = (id, updates) => {

    return(dispatch, getState) => {
    const uid = getState().auth.uid;//thunk takes second argument getState, using that we can fetch uid of that particular user 
      return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=>{   //*************************NOTE:we are returning this for testing purpose, so we can chain "then" call for the then returned here
            dispatch(editExpense(id, updates));
            
        }).catch((e)=>{
            alert("error updating")
        })
    }
    
}



//SET_EXPENSE
//..........for fetching data from firebase and storing it in store
export const setExpenses = (expenses) => {
    return {
        type:"SET_EXPENSES",
        expenses
    }
}

//this is async call which finally dispatches above action to store the data in store
export const startSetExpenses = () => {
    return (dispatch, getState) => {
    const uid = getState().auth.uid;//thunk takes second argument getState, using that we can fetch uid of that particular user  
  //..................................................now FETCHing data which are in array like format from firebase      
    return database.ref(`users/${uid}/expenses`).once('value') //returning promise here, by using return value we can continue in app.js using "then" after fetching expenses and rendering using ReactDOM.render
                        .then((snapshot)=>{
                           
                             //console.log(snapshot.val());//even this retunrs in object format
                            
                             //we have another method just for this format, we can iterate over those item using forEach and push it inside an empty array
                             const expenses=[];
                             snapshot.forEach((childSnapshot) => {
                             expenses.push({
                                     id: childSnapshot.key,
                                     ...childSnapshot.val()
                                   })
                               }); 
                          //console.log(expenses);
                        
                        //dispatching to store
                         dispatch(setExpenses(expenses)) //this will set the expenses in the redux store by dispatching action creator setExpenses and case SET_EXPENSES in expenses reducer, thus making expenses available to ExpenseList.js component to render the expenses through ExpenseListItem.js component one by one

           
                         }).catch((e)=>{
                            console.log("error!!!", e)
                       }); 
        
        
        
        
        
    }
}


//we are doing named export