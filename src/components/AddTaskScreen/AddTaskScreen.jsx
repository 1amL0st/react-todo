import React from 'react';

class AddTaskScreen extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            taskName: "",
            taskDesc: "",
            taskDate: new Date().toLocaleDateString('en-CA'),
            taskTime: "09:00"
        }

        this.OnTaskNameChangeHandler = this.OnTaskNameChangeHandler.bind(this);
        this.OnTaskDescChangeHandler = this.OnTaskDescChangeHandler.bind(this);
        this.OnTaskDateChangeHandler = this.OnTaskDateChangeHandler.bind(this);
        this.OnTaskTimeChangeHandler = this.OnTaskTimeChangeHandler.bind(this);
        this.OnSubmitClickHandler = this.OnSubmitClickHandler.bind(this);
    }

    OnTaskNameChangeHandler(event) {
        this.setState({taskName: event.target.value});
    }

    OnTaskDescChangeHandler(event) {
        this.setState({taskDesc: event.target.value});
    }

    OnTaskDateChangeHandler(event) {
        this.setState({taskDate: event.target.value});
    }

    OnTaskTimeChangeHandler(event) {
        this.setState({taskTime: event.target.value});
    }

    OnSubmitClickHandler(event) {
        let task = this.state;
        this.props.onSubmitHandler({
            name: task.taskName,
            date: task.taskDate,
            time: task.taskTime,
            desc: task.taskDesc
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="screen--a-t">
                <span className="title">Add new task</span>
                <form>
                    <label>
                        Task name:
                        <input className="text-input" type="text" value={this.state.taskName} placeholder="Enter task name here"
                         onChange={this.OnTaskNameChangeHandler}></input>
                    </label>
                    <label>
                        Task description:
                        <textarea className="text-input" type="text" value={this.state.taskDesc} placeholder="Enter task description here"
                         onChange={this.OnTaskDescChangeHandler}></textarea>
                    </label>
                    <label>
                        Date:
                        <input className="text-input" type="date" value={this.state.taskDate} onChange={this.OnTaskDateChangeHandler}></input>
                    </label>
                    <label>
                        Time:
                        <input className="text-input" type="time" value={this.state.taskTime} onChange={this.OnTaskTimeChangeHandler}></input>
                    </label>
                    <input className="submit" type="submit" value="Add" onClick={this.OnSubmitClickHandler}/>
                </form>
            </div>
        )
    }
}

export default AddTaskScreen;