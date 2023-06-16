import { Outlet, Link } from "react-router-dom";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <>
      <Outlet />
      <div className="footer">
        <p className="footer_text">Test task for Bits Orchestra</p>
        <Link className="footer_link" to="https://github.com/BotsiunDenys" target="_blank">
          My github
        </Link>
      </div>
    </>
  );
};

export default Footer;
