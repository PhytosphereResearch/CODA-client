import React from 'react';
import { Spinner } from '../shared/shapes';
import Auth from './Auth';

export const auth = new Auth();

export const CallbackPage = () => {
  return (
  <div>
    <Spinner />
  </div>
)};
