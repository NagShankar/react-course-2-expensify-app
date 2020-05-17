import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

//we have imported test data for below test cases from fixtures/expenses,
//in test cases expenses = fixtures/expenses

//test case for default setup, when the application runs for the first time
test('should set default', ()=>{
    const state = expensesReducer(undefined, {type: '@@INIT'});//check redux dev tool, when application first boot up, and initially state will be default, hence "undefined"
     expect(state).toEqual([]);//initially expenses will be empty array, check in redux dev tool
})

//importing below expenses array from fixtures/expenses

//const expenses =[
//    {
//        id: '1',
//        description: 'Gum',
//        note: '',
//        amount: 195,
//        createdAt: 0
//    },
//    {
//        id: '2',
//        description: 'Rent',
//        note: '',
//        amount: 9000,
//        createdAt: moment(0).subtract(4, 'days').valueOf()
//    },
//    {
//        id: '3',
//        description: 'Credit Card',
//        note: '',
//        amount: 4500,
//        createdAt: moment(0).add(4, 'days').valueOf()
//    }
//    
//]


//test case for remove expense
test('should remove expense by id', ()=>{
    
    const action ={
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id //second item from above expenses array
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[2]])
      
})

test('should not remove expense if id not found', ()=>{
    
    const action ={
        type: 'REMOVE_EXPENSE',
        id: 'blahblahblah' //some random id which is not present in expenses array
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
      
})

//test case for add expense
test('should add new expense', ()=>{
    const expense = {
        id: '4',
        description: 'Bus Pass',
        note: '',
        amount: 3000,
        createdAt: moment(0).add(6, 'days').valueOf()
    }
    const action = {
        type:'ADD_EXPENSE',
        expense:expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses,expense])
    
})

//test case for edit expense
test('should edit expense by id', ()=>{
    const updates = {
        id: '2',
        description: 'April Rent',
        note: '',
        amount: 10000,
        createdAt: moment(0).subtract(4, 'days').valueOf()
        
    } //editing the item with id = 2
    
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,//second item from above expenses array
        updates: updates
    }
    const state = expensesReducer(expenses, action);
    expect(state[1]).toEqual(updates) //state object's second item state[1] or expenses[1] should be equal to updates
       
})

test('should not edit expense if not id not found', ()=>{
    const amount = 20000;  //editing amount property of some non present id
           
    const action = {
        type: 'EDIT_EXPENSE',
        id: 'blahblahblah',//some random id
        updates: amount
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
       
})

//test case for set expenses
test('should set expense', ()=>{
    const action = {
        type: 'SET_EXPENSES',
        expenses : [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]])
    
    
})