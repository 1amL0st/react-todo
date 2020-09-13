import React from 'react';

class ItemTask extends React.Component {
    render() {
        return(
            <div className="item-task">
                <span className="item-task__name">{this.props.task.name}</span>
                <span className="item-task__date-time">
                    <span className="item-task__date">{this.props.task.date}</span>
                    <span className="item-task__time">{this.props.task.time}</span>
                </span>
            </div>
        )
    }
}

export default ItemTask;