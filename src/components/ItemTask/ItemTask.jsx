import React from 'react';

class ItemTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            swipe: null
        }

        this.OnMouseDownHandler= this.OnMouseDownHandler.bind(this);
        this.OnMouseUpHandler = this.OnMouseUpHandler.bind(this);
        this.OnMouseMoveHandler = this.OnMouseMoveHandler.bind(this);
        this.OnMouseLeaveHandler = this.OnMouseLeaveHandler.bind(this);
    }

    OnMouseDownHandler(e) {
        this.setState({ swipe: {offset: 0, last_x: e.screenX}});
    }

    OnMouseLeaveHandler(e) {
        this.setState({swipe: null});
    }

    OnMouseUpHandler(e) {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    OnMouseMoveHandler(e) {
        if (this.state.swipe) {
            const x = this.state.swipe.last_x;
            const offset = this.state.swipe.offset + (e.screenX - x);
            const max_offset = 200;
            if (Math.abs(offset) > max_offset) {
                this.props.onSwipe(this.props.task);
                this.setState({swipe: null}); //ODD
            } else {
                this.setState({ swipe: {offset: offset, last_x: e.screenX}});
            }
        }
    }

    render() {
        const desc_class = (this.state.isExpanded) ? "item-task__desc" : "item-task__desc--hidden";
        const style = (this.state.swipe) ? {marginLeft: this.state.swipe.offset} : {};
        return(
            <div style={style} className="item-task"
            onMouseDown={this.OnMouseDownHandler} onMouseUp={this.OnMouseUpHandler} onMouseMove={this.OnMouseMoveHandler}
            onMouseLeave={this.OnMouseLeaveHandler}>
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