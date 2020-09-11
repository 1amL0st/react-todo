import React from 'react';

import List from './List'
import ItemTask from './ItemTask'

class Inbox extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="inbox">
                <span className="h1">Inbox</span>
                <List>
                    <ItemTask></ItemTask>
                    <ItemTask></ItemTask>
                </List>
            </div>
        );
    }
}

export default Inbox;