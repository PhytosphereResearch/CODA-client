import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

const Shell = (props) => {
    return (
      <div>
        <Header loggedIn={props.auth.isAuthenticated()} />
        <div style={{
 margin: '0 auto', padding: '0 30px', minHeight: 'calc(100vh - 180px)', maxWidth: '1200px',
}}
        >
          {props.children}
        </div>
        <Footer />
      </div>
    );
}

Shell.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object,
};

export default Shell;