import React from 'react';

class ItemSetting extends React.Component
{
    render()
    {
        return (
            <div className="item-setting">
                <span>{this.props.name}</span>
                <input type="checkbox"></input>
            </div>
        )
    }
}

export default ItemSetting;