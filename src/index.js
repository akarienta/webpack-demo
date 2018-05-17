import React from 'react';
import { render } from 'react-dom';

import Main from './main';

const root = document.createElement('div');
root.setAttribute('id', 'root');

document.body.appendChild(root);

render(<Main />, root);
