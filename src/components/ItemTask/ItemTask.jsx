import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MyTime from '../../MyTime';

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
        this.TimeIconData = this.TimeIconData.bind(this);
    }

    OnMouseDownHandler(e) {
        this.setState({ swipe: {offset: 0, last_x: e.screenX}});
    }

    OnMouseLeaveHandler(e) {
        this.setState({swipe: null});
    }

    OnMouseUpHandler(e) {
        if (this.state.swipe) {
            const is_expanded = (this.state.swipe.offset === 0) ? !this.state.isExpanded : this.state.isExpanded;
            this.setState({
                swipe: null,
                isExpanded: is_expanded
            });
        }
    }

    OnMouseMoveHandler(e) {
        if (this.state.swipe) {
            const x = this.state.swipe.last_x;
            const offset = this.state.swipe.offset + (e.screenX - x);
            const max_offset = 150;
            if (Math.abs(offset) > max_offset) {
                this.props.onSwipe(this.props.task);
                this.setState({swipe: null}); //ODD
            } else {
                this.setState({ swipe: {offset: offset, last_x: e.screenX}});
            }
        }
    }

    TimeUntilNow(my_date, my_time)
    {
        return MyTime.MyDateAndMyTimeToDate(my_date, my_time) - new Date();
    }

    TimeIconData()
    {
        const time_left = MyTime.MyDateAndMyTimeUntilNow(this.props.task.date, this.props.task.time);

        const hours_str = (time_left.hours) ? time_left.hours + " hours" : "";
        const minutes_str = (time_left.minutes) ? time_left.minutes + " minutes" : "";
        
        let color = "#00FF00";
        const minutes = time_left.minutes + time_left.hours * 60;
        if (minutes < 0) {
            color = "#000000";
        } else {
            const green = (time_left.hours > 1) ? "A0" : "00" ;
            const red = (time_left.hours <= 1) ? "FF" : "00";
            color = "#" + red + green + "00";
        }

        return {
            title: hours_str + " " + minutes_str,
            color: color
        }
    }

    render() {
        const desc_class = (this.state.isExpanded) ? "item-task__desc" : "item-task__desc--hidden";
        const style = (this.state.swipe) ? {marginLeft: this.state.swipe.offset} : {};

        let time_icon = this.TimeIconData();
        return(
            <div style={style} className="item-task"
            onMouseDown={this.OnMouseDownHandler} onMouseUp={this.OnMouseUpHandler} onMouseMove={this.OnMouseMoveHandler}
            onMouseLeave={this.OnMouseLeaveHandler}>
                <span className="item-task__top">
                        <span className="item-task__name">{this.props.task.name}</span>
                        <FontAwesomeIcon className="item-task__time-icon" title={time_icon.title} icon={icons.faClock}
                         style={{color: time_icon.color}}></FontAwesomeIcon>
                    </span>
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