import React from 'react';

class AddTaskScreen extends React.Component {
    constructor(props)
    {
        super(props);

        this.ClearState = this.ClearState.bind(this);
        this.ClearState();

        this.OnSubmitClickHandler = this.OnSubmitClickHandler.bind(this);
        this.OnInputChangeHandler = this.OnInputChangeHandler.bind(this);
        this.OnClearClickHandler = this.OnClearClickHandler.bind(this);
    }

    ClearState() {
        this.state = {
            taskName: "",
            taskDesc: "",
            taskDate: new Date().toLocaleDateString('en-CA'),
            taskTime: "09:00"
        }
    }

    OnClearClickHandler() {
        this.ClearState();
        this.setState(this.state);
    }

    componentWillUnmount() {
        localStorage.setItem('addTaskScreenState', JSON.stringify(this.state));
    }

    componentDidMount() {
        let old_state = JSON.parse(localStorage.getItem('addTaskScreenState'));
        if (old_state) {
            this.setState(old_state);
        }
    }

    OnInputChangeHandler(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    ValidateInputs() {
        if (this.state.taskName.length === 0) {
            alert("You must enter task name!");
            return false;
        }
        return true;
    }

    OnSubmitClickHandler(event) {
        if (this.ValidateInputs()) {
            let task = this.state;
            this.props.onSubmitHandler({
                name: task.taskName,
                date: task.taskDate,
                time: task.taskTime,
                desc: task.taskDesc
            });
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="screen--a-t">
                <span className="title">Add new task</span>
                <form>
                    <label>
                        Task name:
                        <input name="taskName" className="text-input" type="text" value={this.state.taskName} placeholder="Enter task name here"
                         onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <label>
                        Task description:
                        <textarea name="taskDesc" className="text-input" type="text" value={this.state.taskDesc} placeholder="Enter task description here"
                         onChange={this.OnInputChangeHandler}></textarea>
                    </label>
                    <label>
                        Date:
                        <input name="taskDate" className="text-input" type="date" value={this.state.taskDate} onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <label>
                        Time:
                        <input name="taskTime" className="text-input" type="time" value={this.state.taskTime} onChange={this.OnInputChangeHandler}></input>
                    </label>
                    <input className="button" title="Add task" type="submit" value="Add" onClick={this.OnSubmitClickHandler}/>
                    <input className="button clear" title="Clear fields" type="button" value="Clear" onClick={this.OnClearClickHandler}></input>
                </form>
            </div>
        )
    }
}

export default AddTaskScreen;