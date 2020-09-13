import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            current_date: "",
            current_time: ""
        }

        this.UpdateCurrentDate = this.UpdateCurrentDate.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.UpdateCurrentDate();
            this.UpdateCurrentTime();
        }, 1000);
    }

    componentWillUnmount() {
        console.log('Will unmount!');
        clearInterval(this.interval);
    }

    UpdateCurrentDate() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let year = date.getFullYear();
        let month = (months[date.getMonth() - 1]).slice(0, 3);
        let day = (days[date.getDay()]).slice(0, 3);
        let date_str = `${year} ${month} ${day}`;
        this.setState({current_date: date_str});
    }

    UpdateCurrentTime() {
        let date = new Date();
        let time_str = date.toLocaleTimeString();
        this.setState({current_time: time_str});
    }

    render() {
        return (
            <header className="header">
                <div className="header--controls">
                    <span className="button"><FontAwesomeIcon icon={icons.faList} /></span>
                    <span className="button"><FontAwesomeIcon icon={icons.faCog} /></span>
                </div>
                <div className="header--time">
                    <span className="time--date">{this.state.current_date}</span>
                    <span className="time--time">{this.state.current_time}</span>
                </div>
            </header>
        );
    }
}

export default Header;