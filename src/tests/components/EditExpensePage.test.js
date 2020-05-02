import React from "react";
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses'; 
import { EditExpensePage }  from '../../components/EditExpensePage'; 


//first 3 lines from below test cases are same, hence we can call it only once before each test case with reset or fresh values
let editExpense, removeNow, history, wrapper;

//using one of the Jest's global API tp call once before every ytesy case with fresh data or with reset data 
beforeEach(()=>{
     editExpense = jest.fn();
     removeNow = jest.fn();
     history = { push: jest.fn() }; //history is an object
     wrapper = shallow(<EditExpensePage editExpense={editExpense} history={history} expense={expenses[2]} removeNow={removeNow} match={{params:{id:expenses[2].id}}}/>); 
    
})



//test case EditExpensePage to render correctly
test('should render EditExpensePage correctly',()=>{
   
    expect(wrapper).toMatchSnapshot();
    
})

//test case EditExpensePage to render for edit expense
test('should handle editing expense',()=>{
    wrapper.find('ExpenseForm').prop('onSubmission')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
    
})
    
//test case EditExpensePage to render for remove expense
test('should handle remove expense', ()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeNow).toHaveBeenLastCalledWith({ id: expenses[2].id });
})