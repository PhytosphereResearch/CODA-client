import React from 'react';
import { Spinner } from '../shared/shapes';
import { useLocation } from 'react-router';
import Auth from './Auth';

export const auth = new Auth();

const handleAuthentication = (hash) => {
  if (/access_token|id_token|error/.test(hash)) {
    auth.handleAuthentication();
  }
};

const Callback = () => {
  const location = useLocation();
  handleAuthentication(location.hash);

  return (
  <div>
    <Spinner />
  </div>
)};

export default Callback;
