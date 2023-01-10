import React from 'react';

import 'components/Button.scss';

export default function Button(props) {
  let buttonClass = 'button';

  if (props.confirm) {
    buttonClass += ' button--confirm';
  }

  return <button>{props.children}</button>;
}
