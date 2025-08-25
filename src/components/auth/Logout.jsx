import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "../shared/shapes";

const Logout = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }, []);

  return (
    <div>
      <Spinner />
    </div>
  );
};

export default Logout;
