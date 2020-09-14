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

        this.OnSettingsChange = this.OnSettingsChange.bind(this);
        this.GetSettings = this.GetSettings.bind(this);
    }

    OnSettingsChange(index) {
        this.state.settings[index].isAllowed = !this.state.settings[index].isAllowed;
        this.setState(this.state);
        this.props.onSettingsChange();
    }

    GetSettings() {
        return this.props.settings.slice(0, this.props.settings.length);
    }
 
    render()
    {
        let key = 0;
        return (
            <div className="screen--settings">
                <span className="title">Settings</span>
                <ol className="list">{
                    this.state.settings.map(item => (
                        <ItemSetting key={key++} index={key - 1} name={item.name} isAllowed={item.isAllowed} onChange={this.OnSettingsChange}></ItemSetting>
                    ))
                }</ol>
            </div>
        )
    }
}

export default SettingsScreen;