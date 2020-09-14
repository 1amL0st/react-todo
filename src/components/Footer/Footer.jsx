import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends React.Component {
    render() {
        const r_btn_icon = (this.props.rBtn.isSettingsSave) ? icons.faSave : icons.faPlus;
        return (
            <div className="footer" style={{zIndex:'999999'}}>
                <span className="button--left" title="Back" style={{visibility: (this.props.lBtn.isVisible) ? 'visible' : 'hidden'}}
                onClick={() => {this.props.lBtn.onClick()}}>
                    <FontAwesomeIcon icon={icons.faArrowLeft}></FontAwesomeIcon>
                </span>
                <span className="button--right" title="Add new task" style={{visibility: (this.props.rBtn.isVisible) ? 'visible' : 'hidden'}}
                onClick={() => {this.props.rBtn.onClick()}}>
                    <FontAwesomeIcon icon={r_btn_icon}></FontAwesomeIcon>
                </span>
            </div>
        )
    }
}

export default Footer;