import React from 'react';

import ItemTask from '../ItemTask/ItemTask'

class Inbox extends React.Component {
    render() {
        console.log(this.props.tasks);
        return (
            <div className="inbox">
                <span className="title">Inbox</span>
                <ol className="list">{
                    this.props.tasks.map(item => (
                        <ItemTask task={item}></ItemTask>
                    ))
                }</ol>
            </div>
        );
    }
}

export default Inbox;