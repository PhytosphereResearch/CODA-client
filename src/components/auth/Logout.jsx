import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spinner } from '../shared/shapes';

const Logout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.auth.isAuthenticated()) {
      props.auth.logout();
    } else {
      navigate('/');
    }
  }, [])

  return (
    <div>
      <Spinner />
    </div>
  )
}

Logout.propTypes = {
  auth: PropTypes.object,
};

export default Logout;