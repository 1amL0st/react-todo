import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Helpers from "../../Helpers"

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            curDate: Helpers.DateToDateStr(new Date()),
            curTime: Helpers.DateToTimeStr(new Date())
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({curDate: Helpers.DateToDateStr(new Date())});
            this.setState({curTime: Helpers.DateToTimeStr(new Date())});
        }, 1000);
    }

    componentWillUnmount() {
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