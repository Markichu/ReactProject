import React from 'react';
import './style/Screen.css';

export class Screen extends React.Component {
    render() {
        return <div className="AppScreen">{this.props.state.value}</div>
    }
}

Screen.defaultProps = {
    state: "No state provided.",
}