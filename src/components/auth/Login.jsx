import { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "../shared/shapes";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  }, []);

  return (
    <div>
      <Spinner />
    </div>
  );
};

export default Login;
