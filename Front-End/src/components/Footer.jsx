import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li>
              <a href="#">Servicios</a>
            </li>
            <li>
              <a href="#">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Teléfono: 8305-9845</p>
          <p>Email: progrAcademy@gmail.com</p>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <ul className="social-links">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/?lang=es"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ProgrAcademy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
