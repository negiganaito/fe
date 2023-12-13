import React from 'react';

// eslint-disable-next-line no-unused-vars
import { fbt } from 'fbt';

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

  const a = fbt('Số 2', '2');

  console.log({ a });

  return (
    <div {...props}>
      <p>{a}</p>
      <p>
        <fbt desc="1">Số 1</fbt>
      </p>
      <fbt desc="2">Số 2</fbt>
    </div>
  );
};
