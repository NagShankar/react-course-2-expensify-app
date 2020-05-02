import { createStore } from 'redux';


//ACTION generators

//PAYLOAD - any information other than TYPE sent from the action are usually called payload

//const incrementCount= ( payload ={} ) => { //if default object not set, we may get undefined error if the function call had no object with incrementBy property passed in it
//    return {
//        type:"INCREMENT",
//        incrementBy:typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
//    }
//}


const incrementCount= ( { incrementBy = 1} = {} ) => { //if default object not set, we may get undefined error if the function call had no incrementBy property passed in it, default object is {} = {}
    return {
        type:"INCREMENT",
        incrementBy:incrementBy //or just, incrementBy
    }
}

const decrementCount = ( { decrementBy = 1 } = {} ) => {
    
    return {
        type:"DECREMENT",
        decrementBy //or decrementBy: decrementBy, because both have same name
    }
}

const setCount = ( { count = 93 } = {} ) => {
    return {
         type:"SET",
         count: count
    }
}

const resetCount = ( { count = 300 } = {} ) => {
    return {
         type:"SET",
         count: count
    }
}


//STORE
const store = createStore((state={count:0}, action) => {
    switch(action.type){
            
        case "INCREMENT" : 
//              const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1  
              
            return {
//            count : state.count + incrementBy
                 count : state.count + action.incrementBy
            };
            
        case "DECREMENT" : 
             //const decrementBy = typeof action.decrementBy === "number" ? action.decrementBy : 1  
            
            return { 
           // count : state.count - decrementBy
                count : state.count - action.decrementBy
        };
            
        case "SET" : return {
            count: action.count
        };
            
        case "RESET" : return {
           count: action.count
        };
            
        default: return state;
            
    }
});


//WATCHing store for changes

const wantToUnsubscribe = store.subscribe(()=>{
    console.log(store.getState());
}) 


//ACTIONS are way to communicate with store, they're just objects

//store.dispatch({
//    type: "INCREMENT",
//    incrementBy: 5
//});

store.dispatch(incrementCount({incrementBy:9}));

store.dispatch(incrementCount());

//store.dispatch({
//    type:"INCREMENT"
//});

//wantToUnsubscribe(); //stops console logging

store.dispatch(resetCount({count: 0}));

//store.dispatch({
//    type:"RESET"
//});

store.dispatch(decrementCount({decrementBy: 3}));

//store.dispatch({
//    type:"DECREMENT",
//    decrementBy: 3
//});

store.dispatch(decrementCount());
//store.dispatch({
//    type:"DECREMENT"
//});

//action to set the count

//store.dispatch({
//    type:"SET",
//    count:93
//});

store.dispatch(setCount({count:73}));