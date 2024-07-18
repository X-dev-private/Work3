import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../../Styles/GlobalComponents.css';

const MDropzone = ({ onDropImage }) => {

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (onDropImage) { // Verifique se a função foi passada
        onDropImage(reader.result); // Chama a função de callback com a URL da imagem
      } else {
        console.error("onDropImage is not a function");
      }
    };

    reader.readAsDataURL(file);
  }, [onDropImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="container-dropzone">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p></p>
        ) : (
          <p>Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem</p>
        )}
      </div>
    </div>
  );
};

export default MDropzone;