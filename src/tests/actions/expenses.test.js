import {addExpense, removeExpense, editExpense} from '../../actions/expenses';

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

//addExpense test case

//for user sent values
test('should setup add expense action object', ()=>{
    const expenseData = {
        description:'Rent',
        amount:9000, 
        createdAt:1000,
        note:'This was last months rent', 
     }
    const action = addExpense(expenseData);
    expect(action).toEqual({
         type:"ADD_EXPENSE",
         expense:{
             ...expenseData,
             id:expect.any(String)
         }
    })
})


//for default values
test('should setup add expense action object', ()=>{
    const action = addExpense();
    expect(action).toEqual({
         type:"ADD_EXPENSE",
         expense:{
             id:expect.any(String),
             description:'',
             note:'', 
             amount:0,
             createdAt:0
          }
    })
    
})
