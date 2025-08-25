import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component router={{ location, navigate, params }} {...props} />;
  }

  return ComponentWithRouterProp;
};

export default withRouter;
