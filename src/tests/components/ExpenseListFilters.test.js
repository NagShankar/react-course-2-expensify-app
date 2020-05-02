import React from "react";
import moment from 'moment';
import { shallow } from 'enzyme';
import { filters, altFilters } from '../fixtures/filters'; 
import { ExpenseListFilters }  from '../../components/ExpenseListFilters'; 

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=>{
     setTextFilter = jest.fn();
     sortByDate = jest.fn();
     sortByAmount = jest.fn();
     setStartDate = jest.fn();
     setEndDate = jest.fn();
     wrapper = shallow(
         <ExpenseListFilters 
           filters={filters} //initial value, it expects filters state to render initially
           setTextFilter={setTextFilter}
           sortByDate={sortByDate}
           sortByAmount={sortByAmount}
           setStartDate={setStartDate}
           setEndDate={setEndDate}
         />
     );
    
})

//test case to render ExpenseListFilters correctly
test('should render ExpenseListFilters correctly', ()=>{
   expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alternate filter - altFilters  data', ()=>{
      
    //now we should render the compoent with alternante data - altFilters
    //setting new props - altFilters instead of filters
    wrapper.setProps({filters: altFilters}) //setProp is one method given by enzyme to change thre prop sent to the component, refer enzyme doc for more
     
    expect(wrapper).toMatchSnapshot();
    
})


//test case for text filter
test('should set text filter', ()=>{
     const value='rent';
     wrapper.find('input').simulate('change',{
         target:{value} //we need e event, so mocking the target value of event
     })
     expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

//test case for sort by date filter
test('should sort by date', ()=>{
    const value="date";
     wrapper.setProps({filters: altFilters}); //chaing sortby to amount before changing it to date
     wrapper.find('select').simulate('change',{
         target:{value} //we need e event, so mocking the target value of event
     })
    expect(sortByDate).toHaveBeenCalled();
})

//test case for sort by amount filter
test('should sort by amount', ()=>{
    const value="amount";
   //no need to setProps ack to filters here, because wrapper cwill be called with filters every time which has sortBy date as value
     wrapper.find('select').simulate('change',{
         target:{value} //we need e event, so mocking the target value of event
     })
    expect(sortByAmount).toHaveBeenCalled();
})

//test case for start and end date
test('should handle date changes', ()=>{
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

//test case for focus change
test('should set focus when clicked', ()=>{
    const calendarFocused='endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused); //prop onFocusedChnaged expects object
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})