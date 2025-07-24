import React, { useState, useRef } from 'react';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import Buttons from './components/Buttons';
import { styles } from './styles/styles';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState({
    'professional': '',
    'casual': '',
    'polite': '',
    'social media': ''
  });
  const [isTyping, setIsTyping] = useState({
    professional: false,
    casual: false,
    polite: false,
    'social media': false
  });
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    setResult({
      'professional': '',
      'casual': '',
      'polite': '',
      'social media': ''
    });

    setIsTyping({
      'professional': true,
      'casual': true,
      'polite': true,
      'social media': true
    });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // For local development, please use http://127.0.0.1:8000/process-message
      const response = await fetch('https://testai-pv4q.onrender.com/process-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputText }),
        signal: controller.signal
      });

      if (!response.ok || !response.body) {
        throw new Error('Error en la petición');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partial = '';
      const textChunks = {
        'professional': '',
        'casual': '',
        'polite': '',
        'social media': ''
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });

        const lines = partial.split('\n\n');
        partial = lines.pop(); // Incompleto para la siguiente vuelta

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const parsed = JSON.parse(line.replace('data: ', ''));

            const { tone, word, done: isDone } = parsed;

            if (isDone) {
              setIsTyping(prev => ({ ...prev, [tone]: false }));
              continue;
            }

            if (tone && word) {
              textChunks[tone] += word;

              setResult(prev => ({
                ...prev,
                [tone]: textChunks[tone]
              }));
            }
          }
        }
      }
    } catch (error) {
        alert('Error while connecting the server');
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();

      // Limpia el estado visual
      setIsTyping({
        'professional': false,
        'casual': false,
        'polite': false,
        'social media': false
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Styling Text Converter</h1>

      <InputSection inputText={inputText} setInputText={setInputText} />
      <Buttons isLoading={isLoading} onSubmit={handleSubmit} onCancel={handleCancel} />
      <ResultSection result={result} isTyping={isTyping} />
    </div>
  );
}

export default App;
