import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "./../actions/filters";

//converted to class component
export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  //onDatesChange take an object with destructured start date and end date, refer doc
  changingDate = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  //just for changing the focus, no real impact on this project
  changeFocus = (calendarFocused) => {
    //console.log(calendarFocused); //either start date or end date
    this.setState(() => ({ calendarFocused: calendarFocused }));
  };


  onTextChange = (e) => {
            this.props.setTextFilter(e.target.value);
          }

  onSortChange = (e) => {
            //alert(e.target.value)
            if (e.target.value === "amount") {
              this.props.sortByAmount();
            } else if (e.target.value === "date") {
              this.props.sortByDate();
            }
    };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />

        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <DateRangePicker
          startDateId={"dwjkhqkehwqjkeq"}
          endDateId={"cxzvcxbzbczxbz"}
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.changingDate}
          focusedInput={this.state.calendarFocused} //this is mandatory, with initial value null, has no impact for this project
          onFocusChange={this.changeFocus} //this is mandatory, will focus if its Start date and End date by making use of calendarFocused, has no impact for this project
          showClearDates={true} //clear the date range by clicking on "X" mark
          numberOfMonths={
            1
          } /*change this number to see as many calendars you want */
          isOutsideRange={() =>
            false
          } /*enables past/finished dates as well, you can set range also, refer doc */
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //accessing state of the store
  return {
    filters: state.filters, //grabbing only filters state
  };
};

const mapDispatchToProps = (dispatch) => ({
   //using same name as disptach names
    
    setTextFilter : (text) =>  dispatch(setTextFilter(text)),
    sortByDate : () => dispatch(sortByDate()),
    sortByAmount : () => dispatch(sortByAmount()),
    setStartDate : (startDate) => dispatch(setStartDate(startDate)),
    setEndDate : (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
