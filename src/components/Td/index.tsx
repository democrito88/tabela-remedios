import React from 'react';
import styles from './Td.module.css';
import { Input } from '../Input';

type TdProps = {
  classe?: string;
};

export const Td: React.FC<TdProps> = ({ classe }) => 
    <td className={`${classe ? styles[classe] : ''} ${styles.td}`}>
      <Input />
    </td>
