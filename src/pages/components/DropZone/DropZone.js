import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../../Styles/GlobalComponents.css';

const MDropzone = ({ onDropImage }) => {

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const maxSize = 192; // Define o tamanho máximo desejado para largura e altura
        const width = img.width;
        const height = img.height;
        const scale = Math.min(maxSize / width, maxSize / height);
        
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        if (onDropImage) {
          onDropImage(canvas.toDataURL('image/jpeg')); // Converte para base64
        }
      };
    };

    reader.readAsDataURL(file);
  }, [onDropImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="container-dropzone">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte a imagem aqui...</p>
        ) : (
          <p>Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem</p>
        )}
      </div>
    </div>
  );
};

export default MDropzone;
