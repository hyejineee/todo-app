import 'reflect-metadata';

import { css, Global } from '@emotion/react';
import { router } from '@shared/config';
import { RouterProvider } from 'react-router-dom';
import './index.css';

function Root() {
  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }
        `}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
