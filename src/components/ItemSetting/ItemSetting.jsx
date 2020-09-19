import React from 'react';

class ItemSetting extends React.Component
{
    OnCheckboxHandler() {
        this.props.onChange(this.props.index);
    }

    render()
    {
        const class_name = (this.props.isSupported) ? "item-setting" : "item-setting item-setting--disabled";
        return (
            <div className={class_name} onClick={() => { this.OnCheckboxHandler.call(this); }}>
                <span>{this.props.name}</span>
                <input type="checkbox" checked={this.props.isAllowed} onChange={() => {}}></input>
            </div>
        )
    }
}

export default ItemSetting;