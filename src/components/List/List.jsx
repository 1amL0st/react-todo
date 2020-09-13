import React from 'react';

class List extends React.Component {
    render() {
        return(
            <ol className="list">
                {this.props.children}
            </ol>
        )
    }
}

export default List;