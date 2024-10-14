import React from 'react';
import { InputHTMLAttributes } from 'react';
import './Input.css';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    value?: string;
    onChange?: (value: string) => void;
    
    readOnly?: boolean;
}

export const Input = (props: InputProps) => {
    const {
        value,
        readOnly,
        onChange,
        type = 'text',
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const classes = [
        'input',
        readOnly ? 'input-readOnly' : ''
    ].join(' ')

    return (
        <div className='group'>
            <input
                required
                type={type}
                className={classes}
                value={value}
                readOnly={readOnly}
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    );
};
