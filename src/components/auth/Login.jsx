import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = (props) => {
  useEffect(() => {
    if (!props.auth.isAuthenticated()) {
      props.auth.login();
    }
  }, [])

    return props.auth.isAuthenticated() ? redirect("/") : null;
}

Login.propTypes = {
  auth: PropTypes.object,
};

export default Login;
