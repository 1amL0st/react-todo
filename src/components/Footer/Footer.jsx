import React from 'react';

import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <span className="button"
                onClick={() => {this.props.addButtonHandler()}}><FontAwesomeIcon icon={icons.faPlus}></FontAwesomeIcon></span>
            </div>
        )
    }
}

export default Footer;