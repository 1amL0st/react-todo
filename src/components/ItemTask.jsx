import React from 'react';

class ItemTask extends React.Component {
    constructor() {
        super();

        this.state = {
            task_name: 'Undefined',
            target_date: 'Undefined'
        }
    }

    render() {
        return(
            <div className="item-task">
                <span className="item-task--name">Name: {this.state.task_name}</span>
                <span className="item-task--date">Date: {this.state.target_date}</span>
            </div>
        )
    }
}

export default ItemTask;