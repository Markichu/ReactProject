import './style/Screen.css';

export const Screen = (props) => {
    return <div className="AppScreen">{props.value}</div>
}

Screen.defaultProps = {
    value: "No screen value provided.",
}