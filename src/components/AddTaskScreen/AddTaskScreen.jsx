import React from 'react';
import MyTime from '../../MyTime';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


var g_old_state = null;

class AddTaskScreen extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = this.DefaultState();

        this.OnSubmitClickHandler = this.OnSubmitClickHandler.bind(this);
        this.OnInputChangeHandler = this.OnInputChangeHandler.bind(this);
        this.OnClearClickHandler = this.OnClearClickHandler.bind(this);
        this.OnDatePickerChange = this.OnDatePickerChange.bind(this);
    }

    DefaultState()
    {
        return {
            name: "",
            desc: "",
            date: MyTime.DateToMyDate(new Date()),
            time: MyTime.DateToMyTime(new Date()).slice(0, -3),
        }
    }

    OnClearClickHandler() {
        this.setState(this.DefaultState());
    }
    
    componentWillUnmount() {
        if (g_old_state !== undefined) {
            g_old_state = {};
            Object.assign(g_old_state, this.state);
        }
    }

    componentDidMount() {
        if (g_old_state) {
            this.setState(g_old_state);
        } else {
            g_old_state = null;
        }
    }

    OnInputChangeHandler(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    ValidateInputs() {
        if (this.state.name.length === 0) {
            alert("You must enter task name!");
            return false;
        }
        return true;
    }

    OnSubmitClickHandler(event) {
        if (this.ValidateInputs()) {
            this.props.onSubmitHandler({
                name: this.state.name,
                desc: this.state.desc,
                time: this.state.time,
                date: this.state.date
            });
            g_old_state = undefined;
        }
        event.preventDefault();
    }

    OnDatePickerChange(date) {
        this.setState({
            time: MyTime.DateToMyTime(date).slice(0, -3),
            date: MyTime.DateToMyDate(date)
        });
    }

    render() {
        return (
            <div className="screen--a-t">
                <span className="title">Add new task</span>
                <form>
                    <label>
                        <span className="label">Name:</span>
                        <input name="name" className="input text-input" type="text" value={this.state.name} placeholder="Enter task name here"
                         onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <label>
                        <span className="label">Description:</span>
                        <textarea name="desc" className="input text-input" type="text" value={this.state.desc} placeholder="Enter task description here"
                         onChange={this.OnInputChangeHandler}></textarea>
                    </label>
                    <label>
                        <span className="label">Pick time:</span>
                        <DatePicker className="input text-input" onChange={this.OnDatePickerChange}
                        selected={MyTime.MyDateAndMyTimeToDate(this.state.date, this.state.time)}
                        value={this.state.date + " " + this.state.time}
                        minDate={new Date()}
                        timeInputLabel="Time:"
                        timeFormat="hh:mm"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput>
                        </DatePicker>
                    </label>
                    <input className="button" title="Add task" type="submit" value="Add" onClick={this.OnSubmitClickHandler}/>
                    <input className="button clear" title="Clear fields" type="button" value="Clear" onClick={this.OnClearClickHandler}></input>
                </form>
            </div>
        )
    }
}

export default AddTaskScreen;