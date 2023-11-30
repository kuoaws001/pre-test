import React, { useState, useRef, useEffect, useReducer } from 'react'

const Action = {
    increment: 'increment',
    decrement: 'decrement',
    set: 'set',
    stop: 'stop'
}

interface IProps {
    min: number;
    max: number;
    step: number;
    name: string;
    value: number;
    disabled: boolean;
    disableInc?: boolean;
    disableDec?: boolean;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
}

const qtyReducer = (min: number, max: number) => {
    return (state: any, action: any) => {
        const { type, payload } = action;

        switch (type) {
            case Action.increment:
                if (state.qty + payload >= max) {
                    return { qty: max }
                } else {
                    return { qty: state.qty + payload }
                }

            case Action.decrement:
                if (state.qty - payload <= min) {
                    return { qty: min }
                } else {
                    return { qty: state.qty - payload }
                }

            case Action.set:
                return { qty: payload }

            default:
                return { qty: state.qty }
        }
    }
}

const CustomInputNumber = ({ min, max, step, name, value, disabled, disableInc, disableDec, onChange, onBlur }: IProps) => {

    const [init, setInit] = useState(true);
    const [state, dispatch] = useReducer(qtyReducer(min, max), { qty: value });
    const [action, setAction] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (init) {
            setInit(false)
        } else {
            const emitChangeEvent = () => {
                let e = new Event('change', { bubbles: true })
                inputRef.current && inputRef.current.dispatchEvent(e)
                onChange(e)
            }

            emitChangeEvent();
        }
    }, [state.qty])

    useEffect(() => {
        const interval = setInterval(() => {

            if (!action) return

            if (action == Action.increment) {
                dispatch({ type: Action.increment, payload: step })
            }

            if (action == Action.decrement) {
                dispatch({ type: Action.decrement, payload: step })
            }

            if (action == Action.stop) {
                clearInterval(interval)
            }

        }, 200)

        return () => clearInterval(interval);
    }, [action])

    return (
        <div>
            <button
                className={`btn-box ${state.qty <= min || disabled || disableDec ? 'disable' : ''}`}
                onMouseDown={() => setAction(Action.decrement)}
                onMouseUp={() => setAction(Action.stop)}
                onClick={() => dispatch({ type: Action.decrement, payload: step })}
                disabled={disabled || disableDec}
            >
                <span>-</span>
            </button>
            <input
                className='number-input-box'
                type='number'
                name={name}
                value={state.qty}
                ref={inputRef}
                onChange={(e) => dispatch({ type: Action.set, payload: e.target.value })}
                onBlur={(e) => {
                    let value = Number(e.target.value);
                    if (value >= max) value = max;
                    if (value <= min) value = min;
                    dispatch({ type: Action.set, payload: value })
                    onBlur(e)
                }}
                onInput={() => {
                    console.log('emit InputEvent');
                }}
                disabled={disabled}
            />
            <button
                className={`btn-box ${state.qty >= max || disabled || disableInc ? 'disable' : ''}`}
                onMouseDown={() => setAction(Action.increment)}
                onMouseUp={() => setAction(Action.stop)}
                onClick={() => dispatch({ type: Action.increment, payload: step })}
                disabled={disabled || disableInc}
            >
                <span>+</span>
            </button>
        </div>
    )
}

export default CustomInputNumber