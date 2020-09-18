import React from 'react';

import ItemTask from '../ItemTask/ItemTask'

class Inbox extends React.Component {
    constructor(props) {
        super(props);
    
        this.OnItemSwipeHandler = this.OnItemSwipeHandler.bind(this);
        this.OnMouseWheel = this.OnMouseWheel.bind(this);
    }

    OnItemSwipeHandler(task) {
        this.props.onRemoveTask(task);
    }

    OnMouseWheel(e) {
    }

    render() {
        return (
            <div onWheel={this.OnMouseWheel} className="inbox">
                <span className="title">Inbox</span>
                <ol className="list">{
                    this.props.tasks.map(task =>
                        (<ItemTask onSwipe={this.OnItemSwipeHandler} task={task} key={task.key}></ItemTask>))}
                </ol>
            </div>
        );
    }
}

export default Inbox;