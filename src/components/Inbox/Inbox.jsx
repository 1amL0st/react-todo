import React from 'react';

import ItemTask from '../ItemTask/ItemTask'

class Inbox extends React.Component {
    render() {
        return (
            <div className="inbox">
                <span className="title">Inbox</span>
                <ol className="list">{
                    this.props.tasks.map(item => (
                        <ItemTask taskName={item.name} taskDate={item.date}></ItemTask>
                    ))
                }</ol>
            </div>
        );
    }
}

export default Inbox;