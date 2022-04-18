import ImageEditor from '@toast-ui/react-image-editor';
import Button from 'components/atoms/button';
import { mapModifiers } from 'libs/component';
import React, { useRef } from 'react';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';
const download = require('downloadjs');

//NOTE: https://thewebdev.info/2021/06/02/how-to-make-a-photo-editor-with-react/
const Editor = () => {
  const componentClassName = mapModifiers('m-image-editor');
  const className = `${componentClassName}`.trim();

  const imageEditor = useRef(null);

  const myTheme = {
    'common.bisize.width': '0',
    'common.bisize.height': '0',
    'common.backgroundColor': '#F6F6F6',
    'downloadButton.display': 'none',
  };

  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(';')[0];
      const extension = data.split(';')[0].split('/')[1];
      download(data, `image.${extension}`, mimeType);
    }
  };

  return (
    <div className={className}>
      <Button modifiers="primary" size="small" onClick={saveImageToDisk}>
        Save
      </Button>
      <ImageEditor
        ref={imageEditor}
        includeUI={{
          loadImage: {
            path: 'https://next-js-tshirt-shopping.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538021%2Ftshirt%2Fproducts%2Fezafikjm5prqocue1fgl.png&w=1920&q=75',
            name: 'image',
          },
          theme: myTheme,
          menu: ['filter', 'text', 'mask', 'icon', 'draw', 'crop', 'flip', 'rotate'],
          uiSize: {
            width: '100%',
            height: '500px',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    </div>
  );
};

export default Editor;
