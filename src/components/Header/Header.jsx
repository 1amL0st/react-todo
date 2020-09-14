import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            curDate: this.GetCurDateStr(),
            curTime: this.GetCurTimeStr()
        }
    }

    GetCurTimeStr() {
        return new Date().toLocaleTimeString();
    }

    GetCurDateStr() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let year = date.getFullYear();
        let month = (months[date.getMonth() - 1]).slice(0, 3);
        let day = (days[date.getDay()]).slice(0, 3);
        return `${year} ${month} ${day}`;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({curDate: this.GetCurDateStr()});
            this.setState({curTime: this.GetCurTimeStr()});
        }, 1000);
    }

    componentWillUnmount() {
        console.log('Will unmount!');
        clearInterval(this.interval);
    }

    render() {
        return (
            <header className="header">
                <div className="header--controls">
                    <span className="button" title="Idk"><FontAwesomeIcon icon={icons.faList} /></span>
                    <span className="button" title="Settings"
                    onClick={() => {this.props.onSettingsBtnClick()}}><FontAwesomeIcon icon={icons.faCog} /></span>
                </div>
                <div className="header--time">
                    <span className="time--date">{this.state.curDate}</span>
                    <span className="time--time">{this.state.curTime}</span>
                </div>
            </header>
        );
    }
}

export default Header;