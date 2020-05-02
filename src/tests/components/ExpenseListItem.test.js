import React from "react";
import { shallow } from 'enzyme';
import ExpenseListItem  from '../../components/ExpenseListItem'; //there's no connected vresion, hence importing default
import expenses from '../fixtures/expenses'; //our own data for testing puspose

test('should render single list item',()=>{
    const wrapper = shallow(<ExpenseListItem id={expenses[2].id} description={expenses[2].description} amount={expenses[2].amount} createdAt={expenses[2].createdAt}/>);
    expect(wrapper).toMatchSnapshot();
})

//or simply spread an expense like below
//test('should render single list item',()=>{
//    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
//    expect(wrapper).toMatchSnapshot();
//})