import { mapModifiers } from 'libs/component';
import React, { useEffect } from 'react';

// NOTE: --https://codes4education.com/custom-file-upload-button-in-html-css-javascript/
// NOTE: --https://www.youtube.com/watch?v=WEJMYNK-rj4

const InputFile = ({ dataText, name, accept, onChange }) => {
  const componentClassName = mapModifiers('a-input-file');
  const className = `${componentClassName}`.trim();

  useEffect(() => {
    const element = document.querySelector('.a-input-file');

    element.addEventListener('change', e => {
      const container = document.querySelector('.a-input-file__container');
      container.attributes[1].value = e.target.value.replace(/.*(\/|\\)/, '');
    });
  }, []);

  return (
    <div className={className}>
      <div className="a-input-file__container" data-text={dataText}>
        <input name={name} type="file" accept={accept} onChange={onChange} className="a-input-file__container--input" />
      </div>
    </div>
  );
};

export default InputFile;
