import ImageEditor from '@toast-ui/react-image-editor';
import { mapModifiers } from 'libs/component';
import React from 'react';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';

const Editor = () => {
  const componentClassName = mapModifiers('m-image-editor');
  const className = `${componentClassName}`.trim();

  const myTheme = {
    'common.bisize.width': '0',
    'common.bisize.height': '0',
    'common.backgroundColor': '#fff',
  };

  return (
    <div className={className}>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: 'https://next-js-tshirt-shopping.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538021%2Ftshirt%2Fproducts%2Fezafikjm5prqocue1fgl.png&w=1920&q=75',
            name: 'white t-shirt',
          },
          theme: myTheme,
          menu: ['shape', 'filter', 'text', 'mask', 'icon', 'draw', 'crop', 'flip', 'rotate'],
          // initMenu: 'filter',
          uiSize: {
            width: '100%',
            height: '500px',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
      />
    </div>
  );
};

export default Editor;
