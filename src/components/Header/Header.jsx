import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MyTime from '../../MyTime'

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            curDate: MyTime.DateToMyDateNamed(new Date()),
            curTime: MyTime.DateToMyTime(new Date())
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({curDate: MyTime.DateToMyDateNamed(new Date())});
            this.setState({curTime: MyTime.DateToMyTime(new Date())});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <header className="header">
                <div className="header--controls">
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