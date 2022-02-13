import React from 'react';
import "./style/Button.css";

export class Button extends React.Component {
    render() {
        return (
            <div className="AppButton no-select" style={{flex: this.props.width}} onClick={this.props.onClick}>
                {this.props.text}
            </div>
        );
    }
}

Button.defaultProps = {
    text: 'Button',
    width: 1,
    onClick: () => alert("Button has no assigned onClick function."),
}