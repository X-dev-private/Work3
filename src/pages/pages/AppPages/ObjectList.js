import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BountiesCard from '../../components/JobsCard/BountiesCard';

const ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [objectContent, setObjectContent] = useState('');

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/list');
        setObjects(response.data);
      } catch (error) {
        console.error('Failed to fetch objects:', error);
      }
    };

    fetchObjects();
  }, []);

  const fetchObjectContent = async (key) => {
    try {
      const response = await axios.get(`http://localhost:5000/object/${encodeURIComponent(key)}`);
      setObjectContent(response.data);
      setSelectedObject(key);
    } catch (error) {
      console.error('Failed to fetch object content:', error);
      setObjectContent('');
      setSelectedObject(null);
    }
  };

  return (
    <div>
      <h2>Lista de Objetos no S3:</h2>
      <ul>
        {objects.map((obj, index) => (
          <li key={index}>
            <button onClick={() => fetchObjectContent(obj.Key)}>{obj.Key}</button>
          </li>
        ))}
      </ul>
      {selectedObject && (
        <div>
          <h3>Conteúdo do Objeto Selecionado ({selectedObject}):</h3>
          <pre>{objectContent}</pre>
          {/* Renderize o componente BountiesCard com o conteúdo do objeto selecionado */}
          <BountiesCard content={objectContent} />
        </div>
      )}
    </div>
  );
};

export default ObjectList;






