import filterReducer from '../../reducers/filters';
import moment from 'moment';

//test case for default setup, when the application runs for the first time
test('should setup default filter values',()=>{
    const state = filterReducer(undefined, {type: '@@INIT'}); //check redux dev tool, when application first boot up, and initially state will be default, hence "undefined"
    expect(state).toEqual({
        text: '', 
        sortBy: 'date', 
        startDate: moment().startOf('month'), 
        endDate: moment().endOf('month') 
    }) //this object is the default values for filter object when the application boot up, check in redux dev tool 
})

//test case to set sortBy amount
test('should set sortBy to amount',()=>{
    const state = filterReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

//test case to set sortBy Date
//even though default sorting is date, we need to wrote test case when user switches between sortByAmount to sortByDate
test('should set sortBy to date',()=>{
    const currentState = {
        text: '', 
        sortBy: 'amount', //to change sortBy to date, before it should be sortBy = amount
        startDate: undefined,
        endDate: undefined 
    }
    const action = { type: 'SORT_BY_DATE' }
    const state = filterReducer(currentState, action);
    expect(state.sortBy).toBe('date');
})

//test case to set text filter
test('should set text filter', ()=>{
    const state = filterReducer(undefined, {type: 'SET_TEXT_FILTER', text:'rent'})
    expect(state.text).toBe('rent')
})

//test case for startDate filter
test('should set startDate filter', ()=>{
  const date = moment();
    const state = filterReducer(undefined, {
        type: 'SET_START_DATE',
        sDate: date //moment() //dont set moment() directly, cause it will change at the test run time
    })
    expect(state.startDate).toEqual(date)
})

//test case for endDate filter
test('should set endDate filter', ()=>{
  const date = moment();
    const state = filterReducer(undefined, {
        type: 'SET_END_DATE',
        eDate: date //moment() //dont set moment() directly, cause it will change at the test run time
    })
    expect(state.endDate).toEqual(date)
})
