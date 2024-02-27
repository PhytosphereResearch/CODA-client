import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.auth.isAuthenticated()) {
      props.auth.login();
    } else {
      navigate('/');
    }
  }, [])

      return null;
}

Login.propTypes = {
  auth: PropTypes.object,
};

export default Login;
