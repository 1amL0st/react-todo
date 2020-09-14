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
        return (
            <div className="screen--settings">
                <span className="title">Settings</span>
                <ol className="list">{
                    this.state.settings.map(item => (
                        <ItemSetting name={item.name} isAllowed={item.isAllowed}></ItemSetting>
                    ))
                }</ol>
            </div>
        )
    }
}

export default SettingsScreen;