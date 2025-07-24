import React from 'react';
import { styles } from '../styles/styles';

function Buttons({ isLoading, onSubmit, onCancel }) {
  return (
    <div style={styles.buttonGroup}>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        style={{
          ...styles.button,
          ...styles.sendButton,
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? 'Processing...' : 'Process'}
      </button>

      <button
        onClick={onCancel}
        disabled={!isLoading}
        style={{
          ...styles.button,
          ...styles.cancelButton,
          opacity: !isLoading ? 0.6 : 1
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default Buttons;
