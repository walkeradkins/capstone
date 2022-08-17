import "./login-footer.css";

const LoginFooter = () => {
  return (
    <div className="login-footer__container">
      <div className="underline" />
      <div className="footer__header">🔷 WALKER ADKINS</div>
      <ul className="footer__tech-container">
        <li className="footer__tech">Python</li>
        <li className="footer__tech">Flask</li>
        <li className="footer__tech">SQLAlchemy</li>
        <li className="footer__tech">React</li>
        <li className="footer__tech">Redux</li>
      </ul>
    </div>
  );
};

export default LoginFooter;
