import React from 'react';

type InputProps = {
  type: string;
};

function CustomInput({ type }: InputProps) {
  switch (type) {
    case 'text':
      return <input type="text" />;
    case 'checkbox':
      return <input type="checkbox" />;
    case 'radio':
      return <input type="radio" />;
    default:
      return null;
  }
}

export default CustomInput;