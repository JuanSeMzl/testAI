import React from 'react';
import { styles } from '../styles/styles';

function InputSection({ inputText, setInputText }) {
  return (
    <textarea
      rows="4"
      placeholder="Write your text here..."
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      style={styles.textarea}
    />
  );
}

export default InputSection;
