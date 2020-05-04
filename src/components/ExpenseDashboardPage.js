import React from "react";
import ExpenseList from './ExpenseList'; //importing connected version of the component, so no need of "{}"
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
 <div>
       <ExpensesSummary />
       <ExpenseListFilters />
       <ExpenseList />
           
    </div>
);


export default ExpenseDashboardPage;