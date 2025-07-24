import React from 'react';

const ResultSection = ({ result, isTyping }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Results</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Profesional</label><br />
        <textarea rows="3" cols="50" value={result.professional} readOnly />
        {isTyping.professional && <p style={{ color: 'gray', margin: 0 }}>Writing...</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Casual</label><br />
        <textarea rows="3" cols="50" value={result.casual} readOnly />
        {isTyping.casual && <p style={{ color: 'gray', margin: 0 }}>Writing...</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Polite</label><br />
        <textarea rows="3" cols="50" value={result.polite} readOnly />
        {isTyping.polite && <p style={{ color: 'gray', margin: 0 }}>Writing...</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Social Media</label><br />
        <textarea rows="3" cols="50" value={result["social media"]} readOnly />
        {isTyping["social media"] && <p style={{ color: 'gray', margin: 0 }}>Writing...</p>}
      </div>
    </div>
  );
};

export default ResultSection;
