import { useState } from "react";
import Legal from "./landing/Legal";

const Footer = () => {
  const [show, setShow] = useState(false);

  const displayStatement = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <div className="copyright">
      <Legal show={show} handleCloseModal={handleCloseModal} />
      <a onClick={displayStatement}>
        © 2016 Phytosphere Research | Version 2.0 | Disclaimer |
        Nondiscrimination statement
      </a>
    </div>
  );
};

export default Footer;
