import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
//import "react-dates/lib/css/_datepicker.css"; //moved to app.js so other components can make use of it, just to avoid confusion of inporting it everywhere

//const now = moment();
//console.log(now.format('MMM Do, YYYY'))

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props); //now props will have the 'expense prop' sent from Edit Expense page to populate the fields to edit it
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? props.expense.amount.toString() : "", //converting back to string while editing which we had earlier converted to number before submitting it to store
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(), //providing initial value i.e by default today's date
      calendarFocused: false,
      error: "",
    };
  }

  //WE CAN COMBINE DESCRIPTION AND NOTE IN ONE EVENT HANDLER LIKE BELOW
  //onValueChange = (e) => {
  //    const name=e.target.name;
  //    const value=e.target.value;
  //
  //    this.setState({
  //        [name]:value
  //    })
  //
  //}

  //   componentDidMount() {
  //     console.log(this.state);
  //   }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    //you cant assign e.target.value in setState directly, you cant do like this, this will throw an synthetic error, if you really want to assign target value directly in setState use e.persist() before doing that as suggested by that error
    //e.persist();
    //this.setState(()=>({note:e.target.value}))
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    //below matches empty string and regex with it
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (date) => {
    //, it activates a calendar again, it takes an argument(can be Date or Now and any name) in the form of moment and gives the back the date to reset the date
    //not letting user to clear date field, now setting onChange only when there's date already present there, thus forcing date to be present all the time and not letting user to chnage it at all, and change only if there's date
    //console.log(date.valueOf()); //new moment object is returned, and valueOf will convert time and date in milliseconds since Unix Epoch
    if (date) {
      this.setState(() => ({ createdAt: date }));
    }
  };
  onFocusChange = ({ focused }) => {
    //as given in official docs, destructuring the focused property, which have boolean value = TRUE on clicking its
    //console.log(focused);
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault(); //avoiding refresh if they press submit, which is browser default behaviour

    //validation to check if the value is present for fields like description and amount, only then make submit
    if (!this.state.description || !this.state.amount) {
      //alert("please enter value for desc and amount")
      //set error state to "Please provide description and amount"
      this.setState(() => ({
        error: "Please provide description and amount",
      }));
    } else {

      this.props.onSubmission({
        description: this.state.description,
        note: this.state.note,
        amount: parseFloat(this.state.amount, 10),
        createdAt: this.state.createdAt.valueOf(), //if valueOf not provided, then it displays moment object
      });
      //console.log('submitted');
        
        this.setState(() => ({
        //now emptying all fields after success
        description: "",
        note: "",
        amount: "",
        createdAt: moment(), //providing initial value
        calendarFocused: false,
        error: "",
      }));
        
        
        
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            autoFocus
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />

          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={
              1
            } /*change this number to see as many calendars you want */
            isOutsideRange={() =>
              false
            } /*enables past/finished dates as well, you can set range also, refer doc */
          />

          <textarea
            name="note"
            placeholder="Add a note for your expense(optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
