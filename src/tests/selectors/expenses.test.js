import  getVisibleFilters from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses'
//valueOf() with moment give the timestamp of that particular date

//....NOTE: no matter wat the result will depend on sortByDate along with other filter set beacuse it is default, so consider sortByDate always for every test output

//we have imported test data for below test cases from fixtures/expenses,
//in test cases expenses = fixtures/expenses

//importing below expenses array from fixtures/expenses

//const expenses =[
//    {
//        id: '1',
//        description: 'Gum',
//        note: '',
//        amount: 195,
//        createdAt: 0
//    },
//    {
//        id: '2',
//        description: 'Rent',
//        note: '',
//        amount: 9000,
//        createdAt: moment(0).subtract(4, 'days').valueOf()
//    },
//    {
//        id: '3',
//        description: 'Credit Card',
//        note: '',
//        amount: 4500,
//        createdAt: moment(0).add(4, 'days').valueOf()
//    }
//    
//]


//text filter test case
test('should filter by text value', ()=>{
    const filters={
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleFilters(expenses, filters);
    expect(result).toEqual([expenses[2],expenses[1]])
    
});

//start date filter test case
test('should filter by StartDate', ()=>{
      const filters={
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = getVisibleFilters(expenses, filters);
    expect(result).toEqual([expenses[2],expenses[0]]); //you may expect [expenses[0],expenses[2]] but no, because its sorting by date by default, recently created will always come first, considering sortByDate here as its is default
    
})

//end date filter test case
test('should filter by endDate',()=>{
    const filters={
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }
    const result = getVisibleFilters(expenses, filters);
    expect(result).toEqual([expenses[0],expenses[1]])
})

//sortByDate filter test case
test('should filter by sortBydate', ()=>{
    const filters={
        text: '',
        sortBy: 'date',//recent first
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleFilters(expenses, filters);
    expect(result).toEqual([expenses[2],expenses[0],expenses[1]])
})

//sortByAmount filter test case
test('should filter by sortByAmount', ()=>{
    const filters={
        text: '',
        sortBy: 'amount',//higher amount first
        startDate: undefined,
        endDate: undefined
    }
    const result = getVisibleFilters(expenses, filters);
    expect(result).toEqual([expenses[1],expenses[2],expenses[0]])
})