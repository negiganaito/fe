import React from 'react';

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    backgroundColor: 'green',
  },

  size: {
    fontSize: '100px',
  },

  underline: {
    textDecoration: 'underline',
  },
});

// eslint-disable-next-line react/prop-types
export const HomePage = ({ xstyle = [styles.size, styles.underline] }) => {
  const props = Object.assign({}, { ...stylex.props(styles.root, xstyle) });

  return <h1 {...props}>Home</h1>;
};
