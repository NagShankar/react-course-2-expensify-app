import { login, logout } from '../../actions/auth';

test('should login with action object', () => {
    const uid = "abc123";
    const action = login(uid); 

    expect(action).toEqual({
        type: "LOGIN",
        uid
    })
    
})

test('should logout with action object',()=>{
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT"
    })
    
})