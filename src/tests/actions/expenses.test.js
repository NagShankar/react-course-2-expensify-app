//mock store for testing Redux async action creators and middleware
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from '../../actions/expenses';
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares); //we are providing a middleware for our mock store

const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
//this sets up dummy data before each test could run and wipes the data for each test case, only the data written by last test case remains along with our dummy test data which we loop over dummy expenses from fixtures
beforeEach((done)=>{
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt })=>{
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})


//removeExpense test case
test('should setup remove expense action object', () => {
    const action = removeExpense({id:'123abc'}); //removeExpense expectes id in the object format, check removeExpense action creator in action folder
    
//    expect(action).toBe({
//         type:"REMOVE_EXPENSE",
//         id:'123abc'
//    })
    
    //toBe uses '===' for equality checking, but we are checking for obejct equality which cannot happen with '===', fo example {}==={} is false, []===[] is false
    
    //----------------------------so use toEqual instead of toBe, toEqual for objects and Arrays, toBe for strings, numbers and booleans 
    //----------------------toEqual checks for nested object also
        
     expect(action).toEqual({
         type:"REMOVE_EXPENSE",
         id:'123abc'
    })
    
    
})

//remove Expense on firebase aync test case
test("should remove expense on firebase", (done)=>{
   const store= mockStore({ auth: { uid } }); //creating a mock store or use defaultAuthState
   const id = expenses[2].id;
   store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();//getting all actions that are dispatched to our mocked store
        expect(actions[0]).toEqual({
            type:"REMOVE_EXPENSE",
            id
        })
       return database.ref(`users/${uid}/expenses/${id}`).once('value');
       
   }).then((snapshot)=>{
       expect(snapshot.val()).toBeFalsy();
       done();
   }) 
    
    
})

//editExpense test case
test('should setup edit expense action object', () => {
  const action = editExpense("9373abc", { note:'new note value'}); 
    //editExpense expectes id in the number format and update in object format, check editExpense action creator in action folder
    expect(action).toEqual({
        type:"EDIT_EXPENSE",
        id:'9373abc',
        updates:{
            note:'new note value'
        }
    })
    
})

//remove Expense on firebase aync test case
test('should edit expense on firebase', (done)=>{
    const store = mockStore(defaultAuthState); //creating a mock store
    const id = expenses[0].id;
    const updates = {amount:2000}
    
    store.dispatch(startEditExpense(id,updates)).then(()=>{
        const actions = store.getActions();//getting all actions that are dispatched to our mocked store
        expect(actions[0]).toEqual({  //checking if it was dispatched with expected data
            type:"EDIT_EXPENSE",
            id,
            updates
        })
        
         //checking the data stored on database
        return database.ref(`users/${uid}/expenses/${id}`).once('value'); //returning here to make assertions in the next then
        
    }).then((snapshot)=>{
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    })
})

//addExpense test case

//for user sent values
test('should setup add expense action object', ()=>{
//    const expenseData = {
//        description:'Rent',
//        amount:9000, 
//        createdAt:1000,
//        note:'This was last months rent', 
//     }
    //const action = addExpense(expenseData);
    
  const action =  addExpense(expenses[2]);   
     expect(action).toEqual({
         type:"ADD_EXPENSE",
         expense:expenses[2]
//         expense:{
//             ...expenseData,
//             id:expect.any(String)
//         }
    })
})

//addExpense aync test case
test('should add expense to database and store',(done)=>{
   const store= mockStore(defaultAuthState); //creating a mock store
   const expenseData = {
        description:'Phone',
        amount:23000, 
        createdAt:1000,
        note:'Its a samsung Phone', 
     }
    
   store.dispatch(startAddExpense(expenseData)).then(()=>{ //now our thunk i.e async function dispatch an action to update our store and also using "then" to chain with data returned by actual then in async function in expenses.js
      const actions = store.getActions();//getting all actions that are dispatched to our mocked store
     
       expect(actions[0]).toEqual({ //this is equal to dispatch action inside thunk
          type:"ADD_EXPENSE",
          expense:{
              id:expect.any(String),
              ...expenseData
          }
      })
      
        
    //checking the data stored on database
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    
   }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        
         done(); //here "then" will not run until the async call is success or failure, so the Jest will give a done callback; the test will run until done or done.fail are called or it times out i.e it will wait for done to be called then run the test, so we can check if our assertions are passed or failed after async call
        
    });   
       
    
});

test('should add expense with defaults to database and store',(done)=>{
 
   const store= mockStore(defaultAuthState); //creating a mock store
   const expenseDefaults = {
        description:'',
        amount:0, 
        createdAt:0,
        note:'', 
     }
    
   store.dispatch(startAddExpense({})).then(()=>{ //now our thunk i.e async function dispatch an action to update our store and also using "then" to chain with data returned by actual then in async function in expenses.js
      const actions = store.getActions();//getting all actions that are dispatched to our mocked store
     
       expect(actions[0]).toEqual({ //this is equal to dispatch action inside thunk
          type:"ADD_EXPENSE",
          expense:{
              id:expect.any(String),
              ...expenseDefaults
          }
      })
      
        
    //checking the data stored on database
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    
   }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaults);
        
         done(); //here "then" will not run until the async call is success or failure, so the Jest will give a done callback; the test will run until done or done.fail are called or it times out i.e it will wait for done to be called then run the test, so we can check if our assertions are passed or failed after async call
        
    });   
       
    
    
});

//setExpenses test case
test('should setup set expense action object with data', ()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:"SET_EXPENSES",
        expenses
    })
})

//setExpenses aync test case
test('should fetch expenses from firebase', (done)=>{
    const store= mockStore(defaultAuthState); //creating a mock store
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();//getting all actions that are dispatched to our mocked store 
        expect(actions[0]).toEqual({
             type:"SET_EXPENSES",
             expenses //our dummy expenses
        });
        done();
    })
    
})

//for default values
//test('should setup add expense action object for default values', ()=>{
//    const action = addExpense();
//    expect(action).toEqual({
//         type:"ADD_EXPENSE",
//         expense:{
//             id:expect.any(String),
//             description:'',
//             note:'', 
//             amount:0,
//             createdAt:0
//          }
//    })
//    
//})
