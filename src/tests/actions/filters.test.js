import moment from 'moment';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../../actions/filters';

//setStartDate test case
test('should generate set start date action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
         type:"SET_START_DATE",
         sDate: moment(0)
        
    })
})

//setEndDate test case
test('should generate set end date action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
         type:"SET_END_DATE",
         eDate: moment(0)
        
    })
})

//setTextFilter test case
//user given value
test('should generate set set text filter action object', ()=>{
    const text='rent'
    const action = setTextFilter(text);
    expect(action).toEqual({
        type:"SET_TEXT_FILTER",
        text:text
    })
})

//default value
test('should generate set set text filter action object', ()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type:"SET_TEXT_FILTER",
        text:''
    })
})

//sortByDate test case
test('should generate set set sort by date action object', ()=>{
    expect(sortByDate()).toEqual({
        type:"SORT_BY_DATE"
       
    })
})

//sortByAmount test case
test('should generate set set sort by amount action object', ()=>{
    expect(sortByAmount()).toEqual({
       type:"SORT_BY_AMOUNT"
       
    })
})