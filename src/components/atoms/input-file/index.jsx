import { mapModifiers } from 'libs/component';
import React, { useEffect } from 'react';

// NOTE: --https://codes4education.com/custom-file-upload-button-in-html-css-javascript/
// NOTE: --https://www.youtube.com/watch?v=WEJMYNK-rj4

const InputFile = ({ dataText, name, accept = 'image/*', multiple = false, onChange }) => {
  const componentClassName = mapModifiers('a-input-file');
  const className = `${componentClassName}`.trim();

  useEffect(() => {
    const element = document.querySelector('.a-input-file');

    element.addEventListener('change', e => {
      var pattern = /image-*/;
      const file = e.target?.files?.[0];
      if (e.target?.files?.[0] && !file.type.match(pattern)) return;

      const container = document.querySelector('.a-input-file__container');
      container.attributes[1].value = e.target.value.replace(/.*(\/|\\)/, '');
    });
  }, []);

  return (
    <div className={className}>
      <div className="a-input-file__container" data-text={dataText}>
        <input
          multiple={multiple}
          name={name}
          type="file"
          accept={accept}
          onChange={onChange}
          className="a-input-file__container--input"
        />
      </div>
    </div>
  );
};

export default InputFile;
