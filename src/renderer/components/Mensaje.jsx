import React from 'react';

export const Mensaje = ({ children, tipo }) => (
  <div className={`alerta ${tipo}`}>{children}</div>
);
