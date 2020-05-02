//test file should have extension like "something.test.js"


//-----------command------------npm run test -- --watchAll

const add = (a,b) => a+b; // to gert error, do something like a+b+1, basically some wrong implementation

//test case for add = 7
test('should add two numbers', ()=>{
   const result = add(4,3);
//    if(result !==7){
//        throw new Error (`You added 4 and 3. But the result was ${result}. Expected 7`)
//    }
    
    expect(result).toBe(7);
    
});

const generateGreeting = (name='Anonymous') => `Hello ${name}`;

//test case for nag
test('test for string',()=>{
    expect(generateGreeting('nag')).toBe(`Hello nag`)
})


//test case for Anonymous
test('test for string',()=>{
    expect(generateGreeting()).toBe(`Hello Anonymous`)
})