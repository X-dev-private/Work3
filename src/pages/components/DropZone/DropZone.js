import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../../Styles/GlobalComponents.css';


const MDropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Handle the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte os arquivos aqui ...</p>
      ) : (
        <p>Arraste e solte arquivos aqui, ou clique para selecionar arquivos</p>
      )}
    </div>
  );
};

export default MDropzone;
