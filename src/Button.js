import "./style/Button.css";

export const Button = (props) => {
    return (
        <div no-select className="AppButton" style={{flex: props.width}} onClick={props.onClick} >
            {props.text}
        </div>
    );

}

Button.defaultProps = {
    text: 'Button',
    width: 1,
    onClick: () => alert("Button has no assigned onClick function."),
}