---
to: src/components/<%= component %>/<%= h.toLowercase(name) %>/index.jsx
---
import React from 'react';
import { mapModifiers } from 'libs/component';

export const <%= h.toPascalCase(name) %> = (props) => {

  const componentClassName = mapModifiers('<%= h.createBaseClassName(component, name) %>');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};
