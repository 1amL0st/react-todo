import React from 'react';

import ItemTask from '../ItemTask/ItemTask'

class Inbox extends React.Component {
    constructor(props) {
        super(props);

        let key = 0;
        this.state = {
            tasks: this.props.tasks.map(task => 
                (<ItemTask task={task} key={key++}></ItemTask>)
            ),

            swipe: {

            }
        }

        //this.OnSwipeBegin = this.OnSwipeBegin.bind(this.OnSwipeBegin);
        //this.OnSwipeEnd = this.OnSwipeEnd.bind(this.OnSwipeEnd);
    }

    render() {
        return (
            <div className="inbox">
                <span className="title">Inbox</span>
                <ol className="list">{this.state.tasks}</ol>
            </div>
        );
    }
}

export default Inbox;