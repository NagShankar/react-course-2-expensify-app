//NOTE we cannot have multiple resolve and reject, there can only be one resolve and reject

//.............................................creating promise
const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       //resolve('This is my resolved data printed from then callback'); 
       // resolve('This is another resolve, but doesnt work because we cannot have multiple');
        
      //we can resolve object with multiple properties
        resolve({
            name:'nag',
            age:27
        })
      
        //reject call
        //reject('oho something\'s went wrong')
        
    },10000)
    
});

console.log("before");

//............................below are called promise handlers, which runs after either resolve or reject

//promise.then((data)=>{
//    console.log('1', data);
//}).catch((error)=>{
//    console.log('Error: ', error)
//})

//.............promise chaining
//promise.then((data)=>{
//    console.log('1', data);
//    return 'some data from first then'
//}).then((str)=>{
//    console.log("this is chained to previous then call and with data returned by it ", str)
//}).catch((error)=>{
//    console.log('Error: ', error)
//})

//.............promise chaining and returning another promise
promise.then((data)=>{
    console.log('1', data);
    
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve('this is from another promise'); 
     },5000)
   })
}).then((str)=>{
    console.log("from inside another promise ", str)
}).catch((error)=>{
    console.log('Error: ', error)
})

//---------------------OR
//promise takes second argument as catch by default
//promise.then((data)=>{
//    console.log('1', data);
//},(error)=>{
//    console.log('Yappa Error: ', error)
//})


//below runs after above one
//promise.then((data)=>{
//    console.log('2', data);
//})

console.log("after");