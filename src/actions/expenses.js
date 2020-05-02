import uuid from 'uuid4';


//ADD_EXPENSE action creator
export const addExpense = ({description='', note='', amount=0, createdAt=0}={}) => {
    return {
        type:"ADD_EXPENSE",
        expense:{
            id:uuid(),
            description, //or description= description, or use shortand property
            note,
            amount,
            createdAt
        }
        
    }
}


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