import React from 'react';

class ItemTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }

        this.OnClickHandler = this.OnClickHandler.bind(this);
    }

    OnClickHandler() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        const desc_class = (this.state.isExpanded) ? "item-task__desc" : "item-task__desc--hidden";
        return(
            <div onClick={this.OnClickHandler} className="item-task">
                <span className="item-task__name">{this.props.task.name}</span>
                <span className="item-task__date-time">
                    <span className="item-task__date">{this.props.task.date}</span>
                    <span className="item-task__time">{this.props.task.time}</span>
                </span>
                <span className={desc_class}>{this.props.task.desc}</span>
            </div>
        )
    }
}

export default ItemTask;