import React from "react";
import { shallow } from 'enzyme';
import ExpenseForm  from '../../components/ExpenseForm'; 
import expenses from '../fixtures/expenses'; 
import moment from 'moment';


//test case for default values
test('should render ExpenseForm correctly', ()=>{
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();
    
})
//test case with some expense data
test('should render ExpenseForm with expense data', ()=>{
    const wrapper=shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
})

//test case for invalid form submission
test('should throw an error when invlid data is submitted',()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();//snapshot before any error is set
    wrapper.find('form').simulate('submit', {
        //preventDefault() {} // or
        preventDefault:() => {}
        
    }); //if you're using preventDefault in submit then you need to fake that as well, to do that we should pass second argument to simulate which is a mock object 
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    //.state is used to grab the entire state or any individual property like ('error') from inside the state object
    expect(wrapper).toMatchSnapshot();//snapshot after error is set, to make sure error is set and test case has run successfully
})

//test case for onChange description
test('should set description on input change', ()=>{
    const value='dummy description data';
     const wrapper = shallow(<ExpenseForm />);
    //there are multiple input elements, we are fetching first of input by using, at(0)
     wrapper.find('input').at(0).simulate('change',{
         target:{value} //we need e event, so mocking the target value of event
     })
     expect(wrapper.state('description')).toBe(value);
    
})

//test case for onChange note
test('should set note on textarea change', ()=>{
    const value = "dummy note change"
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change',{
        target: {value}
    })
    expect(wrapper.state('note')).toBe(value);
})

//test case for amount
test('should set amount if its valid', ()=>{
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    })
    expect(wrapper.state('amount')).toBe(value);
})

test('should not set amount if its invalid', ()=>{
    const value = '12.123';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    })
    expect(wrapper.state('amount')).toBe(''); //if its invalid its good as saying its empty, t hould be anything othet than the value, so we can say it amount is not set or its empty
})

//test case for onSubmission with props(i.e state object with data entered by user)
test('should call onSubmit prop for valid form submission',()=>{
    const onSubmitSpy = jest.fn();
    
    //onSubmitSpy(); //calling spy/fake function to pass the toHaveBeenCalled
    //expect(onSubmitSpy).toHaveBeenCalled() //fails if the fake function(onSbmitSpy) is not called
    
//    onSubmitSpy('nag', '93');
//    expect(onSubmitSpy).toHaveBeenCalledWith('nag', '93')
    
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmission={onSubmitSpy}/>)
                            
    wrapper.find('form').simulate('submit', {
        //preventDefault() {} // or
        preventDefault:() => {}
        
    });
    expect(wrapper.state('error')).toBe('');
   // expect(onSubmitSpy).toHaveBeenCalled();//this will pass, wrapper shallow has onSubmit prop with onSubmitSpy spy
     
    //expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[0]); //but expenses[0] has 'id' in it, but when we submit form we're not sending any id, so it fails
    
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
    
})

//test case for date change
test('should set new date on date change', ()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);//shallow rendering ExpenseForm component
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);//prop onDateChange expects moment instance
    expect(wrapper.state('createdAt')).toEqual(now);
    
})

//test case for focus change
test('should set focus when clicked', ()=>{
    const focused=true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused}); //prop onFocusedChnaged expects object
    expect(wrapper.state('calendarFocused')).toBe(focused);
})