import React from 'react';
import { mapModifiers } from '../../../libs/component';

const Icon = ({ name, onClick }) => <i onClick={onClick} className={mapModifiers('a-icon', name)} />;

export default Icon;
