import React from 'react';
import styles from './Input.module.css';

export const Input: React.FC = () => {
    const [text, setText] = React.useState('');
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);  
    };

    return <input className={`${styles.input}`} type="text" value={text} onInput={handleInput}/>; //Fc
}