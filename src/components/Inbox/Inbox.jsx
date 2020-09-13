import React from 'react';

import ItemTask from '../ItemTask/ItemTask'

class Inbox extends React.Component {
    render() {
        let key = 0;
        return (
            <div className="inbox">
                <span className="title">Inbox</span>
                <ol className="list">{
                    this.props.tasks.map(item => (
                        <ItemTask task={item} key={key++}></ItemTask>
                    ))
                }</ol>
            </div>
        );
    }
}

export default Inbox;