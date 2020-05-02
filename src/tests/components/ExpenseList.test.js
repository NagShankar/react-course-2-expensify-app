import React from "react";
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList'; // we are importing named vaerions, if you remove "{ }" then you get connected version of the component, since we're using our own data to test the component
import expenses from '../fixtures/expenses'; //our own data for testing puspose

test('should render ExpenseList with fixtures expenses', ()=>{
   const wrapper = shallow(<ExpenseList expenses={expenses} />); //ExpenseList expects prop of expenses, so lets pass our expenses to the component 
   expect(wrapper).toMatchSnapshot(); //initially there will be no snapshot, hence first run will never fail, it'll be trying to create its first ever snapshot
    
});


test('should render ExpenseList with no expenses message', ()=>{
     const wrapper = shallow(<ExpenseList expenses={[]} />); //when no expenses items or empty array
     expect(wrapper).toMatchSnapshot();
    
});