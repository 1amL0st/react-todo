import React from 'react';

class ItemTask extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return(
            <div className="item-task">
                <span className="item-task--name">{this.props.taskName}</span>
                <span className="item-task--date">{this.props.taskDate}</span>
            </div>
        )
    }
}

export default ItemTask;