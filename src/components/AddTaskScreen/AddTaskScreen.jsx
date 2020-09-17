import React from 'react';

var g_old_state = null;

class AddTaskScreen extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = this.DefaultState();

        this.OnSubmitClickHandler = this.OnSubmitClickHandler.bind(this);
        this.OnInputChangeHandler = this.OnInputChangeHandler.bind(this);
        this.OnClearClickHandler = this.OnClearClickHandler.bind(this);
    }

    DefaultState()
    {
        return {
            name: "",
            desc: "",
            date: new Date(),
            time: new Date()
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

    render() {
        return (
            <div className="screen--a-t">
                <span className="title">Add new task</span>
                <form>
                    <label>
                        Name:
                        <input name="name" className="text-input" type="text" value={this.state.name} placeholder="Enter task name here"
                         onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <label>
                        Description:
                        <textarea name="desc" className="text-input" type="text" value={this.state.desc} placeholder="Enter task description here"
                         onChange={this.OnInputChangeHandler}></textarea>
                    </label>
                    <label>
                        Date:
                        <input name="date" className="text-input" type="date" value={this.state.date} onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <label>
                        Time:
                        <input name="time" className="text-input" type="time"   value={this.state.time} onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <input className="button" title="Add task" type="submit" value="Add" onClick={this.OnSubmitClickHandler}/>
                    <input className="button clear" title="Clear fields" type="button" value="Clear" onClick={this.OnClearClickHandler}></input>
                </form>
            </div>
        )
    }
}

export default AddTaskScreen;