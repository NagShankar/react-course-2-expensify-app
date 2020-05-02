import moment from 'moment';

const getVisibleFilters = ((expenses, {text, sortBy, startDate, endDate}) => {
    
    
/*  

In your filters, startDate and endDate can be undefined. In the case that the startDate or endDate for your filters is undefined, you do not want to filter out any data based on that criteria. If startDate is undefined, typeof startDate !== 'number' will be true, and startDateMatch will be true.

In the case that you provide a number to startDateMatch, that means that you do want to filter by date. That means that the first part of your or (||) condition will be false and you will be checking for a match with the second part of the condition (whether the expense date comes before or after the start/endDate).

In short, undefined start and end dates will have typeof date !== 'number' be true and let all data pass through the filter (assuming the expense meets the other criteria as well!!). Start dates and end dates with values will have this condition be false, and you will filter the expenses based on createdAt.

*/
    
    
    return expenses.filter((expense)=>{
        
//        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;//before comparison was done using numbers, now we need to use actual date
//        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;//before comparison was done using numbers, now we need to use actual date
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;//first checking if start date even exist because we have given user to clear range by clicking "X", else setting true to pass the final triple && condition
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;//first checking if start date even exist because we have given user to clear range by clicking "X", else setting true to pass the final triple && condition
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
                       
        return startDateMatch && endDateMatch && textMatch
    }).sort((a,b) => {
      if(sortBy==="date"){
          return a.createdAt < b.createdAt ? 1 : -1
      }
        else if(sortBy==="amount"){
          return a.amount < b.amount ? 1 : -1
      }
        
    })
});

export default getVisibleFilters;