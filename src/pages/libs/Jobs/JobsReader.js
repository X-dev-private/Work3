import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const JobsReader = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const file = require('./yourfile.md');
    fetch(file)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, []);

  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default JobsReader;
