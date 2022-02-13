import React from 'react';
import { Button } from './Button';
import { Screen } from './Screen';
import './style/Calculator.css';

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        
        this.clear = this.clear.bind(this);
        this.pressNum = this.pressNum.bind(this);
        this.pressDecimal = this.pressDecimal.bind(this);
        this.pressOper = this.pressOper.bind(this);
        this.pressEquals = this.pressEquals.bind(this);
        this.undo = this.undo.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.blankState = {
            lastOper: null,
            value: '0',
        }
        this.state = {...this.blankState};
    }

    clear() {
        return () => this.setState(() => {
            return {...this.blankState};
        });
    }

    pressNum(num) {
        return () => this.setState(currState => {

            if (currState.value === 'Infinity' || currState.value === 'NaN') {
                return {
                    ...currState, 
                    value: currState.value,
                }
            }
            
            let newValue = currState.value + num;

            while (newValue[0] === '0' && newValue.length > 1) {
                newValue = newValue.slice(1);
            }

            if (newValue[0] === '.') {
                newValue = '0' + newValue;
            }

            return {
                ...currState, 
                value: newValue,
            }
        });
    }

    pressOper(oper_char) {
        let operFunc;
        switch (oper_char) {
            case '+':
                operFunc = x => y => x + y;
                break;
            case '-':
                operFunc = x => y => x - y;
                break;
            case '*':
                operFunc = x => y => x * y;
                break;
            case '/':
                operFunc = x => y => x / y;
                break;
            default:
                alert("Invalid operator pressed.")
                break;
        }

        return () => this.setState(currState => {
            const inputValue = currState.lastOper ? String(currState.lastOper(Number(currState.value))) : currState.value
            return {
                ...currState, 
                value: 0,
                lastOper: operFunc(Number(inputValue)),
            }
        });
    }
    
    pressInstantOper(oper_char) {
        return () => this.setState(currState => {
            let newValue;
            switch (oper_char) {
                case '√':
                    newValue = String(Math.sqrt(Number(currState.value)));
                    break;
                case '%':
                    newValue = String(Number(currState.value) / 100);
                    break;
                default:
                    newValue = currState.value;
                    break;
            }
            return {
                ...currState, 
                value: newValue,
            }
        });
    }

    pressDecimal() {
        return () => this.setState(currState => {
            return {
                ...currState, 
                value: currState.value.includes(".") ? currState.value : currState.value + '.',
            }
        });
    }

    pressEquals() {
        return () => this.setState(currState => {
            return {
                ...currState, 
                value: currState.lastOper ? String(currState.lastOper(Number(currState.value))) : currState.value,
                lastOper: null
            }
        });
    }

    undo() {
        return () => this.setState(currState => {
            let newValue;
            if (currState.value === "Infinity" || currState.value === 'NaN') {
                newValue = '0';
            } else {
                newValue = currState.value.length > 1 ? currState.value.slice(0, -1) : '0';
            }
            
            if (newValue[newValue.length - 2] === 'e') {
                newValue = newValue.slice(0, -2);
            }
            return {
                ...currState,
                value: newValue,
            }
        });
    }

    handleKeyPress(event) {
        switch( event.key ) {
            case "9":
                this.pressNum('9')();
                break;
            case "8":
                this.pressNum('8')();
                break;
            case "7":
                this.pressNum('7')();
                break;
            case "6":
                this.pressNum('6')();
                break;
            case "5":
                this.pressNum('5')();
                break;
            case "4":
                this.pressNum('4')();
                break;
            case "3":
                this.pressNum('3')();
                break;
            case "2":
                this.pressNum('2')();
                break;
            case "1":
                this.pressNum('1')();
                break;
            case "0":
                this.pressNum('0')();
                break;
            case ".":
                this.pressDecimal()();
                break;
            case "+":
                this.pressOper('+')();
                break;
            case "-":
                this.pressOper('-')();
                break;
            case "*":
                this.pressOper('*')();
                break;
            case "/":
                this.pressOper('/')();
                break;
            case "=":
                this.pressEquals()();
                break;
            case "Backspace":
                this.undo()();
                break;
            case "Enter":
                this.pressEquals()();
                break;
            case "Escape":
                this.clear()();
                break;
            case "s":
                this.pressInstantOper('√')();
                break;
            case "%":
                this.pressInstantOper('%')();
                break;
            default: 
                break;
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    render() {
        return (
            <div className="Calculator">
                <div className="CalcRow">
                    <Screen state={this.state}/>
                </div>
                <div className="CalcRow">
                    <Button text="/" onClick={this.pressOper('/')} />
                    <Button text="*" onClick={this.pressOper('*')} />
                    <Button text="0" onClick={this.pressNum('0')} />
                    <Button text="C" onClick={this.clear()} />
                    <Button text="←" onClick={this.undo()} />
                </div>
                <div className="CalcRow">
                    <Button text="-" onClick={this.pressOper('-')} />
                    <Button text="7" onClick={this.pressNum('7')} />
                    <Button text="8" onClick={this.pressNum('8')} />
                    <Button text="9" onClick={this.pressNum('9')} />
                    <Button text="%" onClick={this.pressInstantOper('%')} />
                </div>
                <div className="CalcRow">
                    <Button text="+" onClick={this.pressOper('+')} />
                    <Button text="4" onClick={this.pressNum('4')} />
                    <Button text="5" onClick={this.pressNum('5')} />
                    <Button text="6" onClick={this.pressNum('6')} />
                    <Button text="√" onClick={this.pressInstantOper('√')} />
                </div>
                <div className="CalcRow">
                    <Button text="." onClick={this.pressDecimal()} />
                    <Button text="1" onClick={this.pressNum('1')} />
                    <Button text="2" onClick={this.pressNum('2')} />
                    <Button text="3" onClick={this.pressNum('3')} />
                    <Button text="=" onClick={this.pressEquals()} />
                </div>
            </div>)
    }
}