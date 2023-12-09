import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './route';
import './styles/app.css';
import { RouterProvider } from '@tanstack/react-router';

const rootElement = document.getElementById('root');

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
