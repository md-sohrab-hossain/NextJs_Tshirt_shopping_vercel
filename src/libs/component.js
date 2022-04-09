import { paramCase } from 'change-case';

function generateModifierClassNameArray(baseClassName, ...modifiers) {
  let classNameArray = [];

  for (const modifier of modifiers) {
    if (Array.isArray(modifier)) {
      classNameArray = classNameArray.concat(generateModifierClassNameArray(baseClassName, ...modifier));
    } else if (typeof modifier === 'string' && modifier.length > 0) {
      classNameArray.push(baseClassName + '--' + modifier);
    }
  }

  return classNameArray;
}

/**
 * Generate `className` from base class name and modifiers, based on MindBEMing.
 */
export function mapModifiers(baseClassName, ...modifiers) {
  return (
    baseClassName +
    ' ' +
    generateModifierClassNameArray(baseClassName, ...modifiers)
      .join(' ')
      .trim()
  ).trim();
}

export function injectModifiers(baseModifiers, ...additionalModifiers) {
  const modifiers = (() => {
    if (typeof baseModifiers === 'undefined') {
      return [];
    } else if (typeof baseModifiers === 'string') {
      return [baseModifiers];
    }
    return baseModifiers;
  })();

  additionalModifiers = additionalModifiers.filter(mod => !modifiers.includes(mod));

  return modifiers.concat(additionalModifiers);
}

export function mapDataAttrs(dataSet) {
  const result = {};

  for (const key in dataSet) {
    result[`data-${paramCase(key)}`] = dataSet[key];
  }

  return result;
}

export function mapModifiersPrefix(prefix, modifiers) {
  let classNameArray = [];

  if (Array.isArray(modifiers)) {
    classNameArray = classNameArray.concat(modifiers.map(modifier => prefix + '-' + modifier));
  } else if (typeof modifiers === 'string') {
    classNameArray.push(prefix + '-' + modifiers);
  }

  return classNameArray;
}
