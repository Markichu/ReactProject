import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Screen } from './Screen';
import './style/Calculator.css';

export const Calculator = () => {
    const [lastOper, setLastOper] = useState(null);
    const [value, setValue] = useState("0");

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    });

    const clear = () => {
        setValue('0');
        setLastOper(null);
    }

    const pressNum = (num) => () => {
        setValue(prevValue => {
            if (prevValue === 'Infinity' || prevValue === 'NaN') return prevValue;

            prevValue += num;
    
            while (prevValue[0] === '0' && prevValue.length > 1) {
                prevValue = prevValue.slice(1);
            }
    
            if (prevValue[0] === '.') {
                prevValue = '0' + prevValue;
            }

            return prevValue
        });
    }

    const pressDecimal = () => {
        setValue(prevValue => {
            if (prevValue.includes('.')) return prevValue;

            return prevValue + '.'
        });
    }

    const pressOper = (oper_char) => () => {
        let operFunc;
        switch (oper_char) {
            case '+':
                operFunc = a => b => {console.log(a, b); return a + b};
                break;
            case '-':
                operFunc = a => b => {console.log(a, b); return a - b};
                break;
            case '*':
                operFunc = a => b => {console.log(a, b); return a * b};
                break;
            case '/':
                operFunc = a => b => {console.log(a, b); return a / b};
                break;
            default:
                return;
        }
        
        setValue(prevValue => {
            setLastOper(prevLastOper => prevLastOper ? operFunc(prevLastOper(Number(prevValue))) : operFunc(Number(prevValue)));
            return '0';
        });
    }

    const pressInstantOper = (oper_char) => () => {
        setValue(prevValue => {
            switch (oper_char) {
                case '√':
                    return String(Math.sqrt(Number(prevValue)));
                case '%':
                    return String(Number(prevValue) / 100);
                default:
                    return prevValue;
            }
        });
    }

    const pressEquals = () => {
        if (lastOper === null) return null;
        setValue(prevValue => {
            let test = String(lastOper(Number(prevValue)))
            setLastOper(null);
            return test;
        });
    }

    const undo = () => {
        setValue(prevValue => {
            if (prevValue === '0') return prevValue;

            prevValue = String(prevValue)
            prevValue = prevValue.slice(0, prevValue.length - 1)

            if (prevValue === "") return "0";
            return prevValue;   
        });
    }

    const handleKeyPress = (event) => {
        switch (event.key) {
            case "9":
                pressNum('9')(); break
            case "8":
                pressNum('8')(); break
            case "7":
                pressNum('7')(); break
            case "6":
                pressNum('6')(); break
            case "5":
                pressNum('5')(); break
            case "4":
                pressNum('4')(); break
            case "3":
                pressNum('3')(); break
            case "2":
                pressNum('2')(); break
            case "1":
                pressNum('1')(); break
            case "0":
                pressNum('0')(); break
            case ".":
                pressDecimal(); break
            case "+":
                pressOper('+')(); break
            case "-":
                pressOper('-')(); break
            case "*":
                pressOper('*')(); break
            case "/":
                pressOper('/')(); break
            case "=":
                pressEquals(); break
            case "Backspace":
                undo(); break
            case "Enter":
                pressEquals(); break
            case "Escape":
                clear(); break
            case "s":
                pressInstantOper('√')(); break
            case "%":
                pressInstantOper('%')(); break
            default: 
                break;
        }
    }
    
    return (
        <div className="Calculator">
            <div className="CalcRow">
                <Screen value={value}/>
            </div>
            <div className="CalcRow">
                <Button text="/" onClick={pressOper('/')} />
                <Button text="*" onClick={pressOper('*')} />
                <Button text="0" onClick={pressNum(0)} />
                <Button text="C" onClick={clear} />
                <Button text="←" onClick={undo} />
            </div>
            <div className="CalcRow">
                <Button text="-" onClick={pressOper('-')} />
                <Button text="7" onClick={pressNum('7')} />
                <Button text="8" onClick={pressNum('8')} />
                <Button text="9" onClick={pressNum('9')} />
                <Button text="%" onClick={pressInstantOper('%')} />
            </div>
            <div className="CalcRow">
                <Button text="+" onClick={pressOper('+')} />
                <Button text="4" onClick={pressNum('4')} />
                <Button text="5" onClick={pressNum('5')} />
                <Button text="6" onClick={pressNum('6')} />
                <Button text="√" onClick={pressInstantOper('√')} />
            </div>
            <div className="CalcRow">
                <Button text="." onClick={pressDecimal} />
                <Button text="1" onClick={pressNum('1')} />
                <Button text="2" onClick={pressNum('2')} />
                <Button text="3" onClick={pressNum('3')} />
                <Button text="=" onClick={pressEquals} />
            </div>
        </div>
    );


}