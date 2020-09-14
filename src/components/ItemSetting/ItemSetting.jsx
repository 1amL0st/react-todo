import React from 'react';

class ItemSetting extends React.Component
{
    OnCheckboxHandler() {
        this.props.onChange(this.props.index)
    }

    render()
    {
        return (
            <div className="item-setting">
                <span>{this.props.name}</span>
                <input type="checkbox" defaultChecked={this.props.isAllowed} onChange={() => { this.OnCheckboxHandler.call(this);  }}></input>
            </div>
        )
    }
}

export default ItemSetting;