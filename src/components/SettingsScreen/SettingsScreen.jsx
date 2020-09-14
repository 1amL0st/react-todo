import React from 'react';

import ItemSetting from '../ItemSetting/ItemSetting'

class SettingsScreen extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            settings: this.props.settings.slice(0, this.props.settings.length)
        }
    }

    render()
    {
        let key = 0;
        return (
            <div className="screen--settings">
                <span className="title">Settings</span>
                <ol className="list">{
                    this.state.settings.map(item => (
                        <ItemSetting key={key++} name={item.name} isAllowed={item.isAllowed} onChange={this.props.onSettingsChange}></ItemSetting>
                    ))
                }</ol>
            </div>
        )
    }
}

export default SettingsScreen;