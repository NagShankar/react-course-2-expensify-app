import authReducer from '../../reducers/auth';

test('should set uid for login',()=>{
    const action = {
        type:"LOGIN",
        uid:"abc123" //dummy uid
    }
    const state = authReducer({},action);//no uid yet, its empty state
    expect(state.uid).toBe(action.uid); //checking if state uid equals to action uid, thereby passing the assertion
})

test('shold clear uid for logout',()=>{
     const action = {
        type:"LOGOUT",
    }
    const state = authReducer({uid:'abcd12345'},action); //assuming uid is already present 
    expect(state).toEqual({}); //making assertions to be empty object where uid gets wiped out
})