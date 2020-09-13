import React from 'react';

class ItemTask extends React.Component {
    render() {
        return(
            <div className="item-task">
                <span className="item-task__name">{this.props.taskName}</span>
                <span className="item-task__date">{this.props.taskDate}</span>
            </div>
        )
    }
}

export default ItemTask;