import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer" style={{zIndex:'999999'}}>
                <span className="button--left" onClick={() => {this.props.lBtnHandler()}}>
                    <FontAwesomeIcon icon={icons.faArrowLeft}></FontAwesomeIcon>
                </span>
                <span className="button--right" onClick={() => {this.props.rBtnHandler()}}>
                    <FontAwesomeIcon icon={icons.faPlus}></FontAwesomeIcon>
                </span>
            </div>
        )
    }
}

export default Footer;