import React from "react";
import { shallow } from 'enzyme';
import { AddExpensePage }  from '../../components/AddExpensePage'; 
import expenses from '../fixtures/expenses'; 

//first 3 lines from below test cases are same, hence we can call it only once before each test case with reset or fresh values
let submitNow, history, wrapper;

//using one of the Jest's global API tp call once before every ytesy case with fresh data or with reset data 
beforeEach(()=>{
     submitNow = jest.fn();
     history = { push: jest.fn() }; //history is an object
    
     wrapper = shallow(<AddExpensePage submitNow={submitNow}  history={history}/>); 
    
})

test('should render addExpense page correctly', ()=>{
    //AddExpensePage component expects two things, submitNow and history
    
//    const submitNow = jest.fn();
//    const history = { push: jest.fn() }; //history is an object
//    
//    const wrapper = shallow(<AddExpensePage submitNow={submitNow}  history={history}/>);
    
    
    expect(wrapper).toMatchSnapshot();
})

test('should handle submitNow and history when actual data submitted', ()=>{
    //AddExpensePage component expects two things, submitNow and history
    
//    const submitNow = jest.fn();
//    const history = { push: jest.fn() }; //history is an object
//    
//    const wrapper = shallow(<AddExpensePage submitNow={submitNow}  history={history}/>);
    
    
    wrapper.find('ExpenseForm').prop('onSubmission')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(submitNow).toHaveBeenLastCalledWith(expenses[1]);
    //expect(wrapper).toMatchSnapshot();
})
