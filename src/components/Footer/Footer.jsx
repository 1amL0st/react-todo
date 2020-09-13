import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer" style={{zIndex:'999999'}}>
                <span className="button--left" style={{visibility: (this.props.lBtn.isVisible) ? 'visible' : 'hidden'}}
                onClick={() => {this.props.lBtn.onClick()}}>
                    <FontAwesomeIcon icon={icons.faArrowLeft}></FontAwesomeIcon>
                </span>
                <span className="button--right" style={{visibility: (this.props.rBtn.isVisible) ? 'visible' : 'hidden'}}
                onClick={() => {this.props.rBtn.onClick()}}>
                    <FontAwesomeIcon icon={icons.faPlus}></FontAwesomeIcon>
                </span>
            </div>
        )
    }
}

export default Footer;