import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="contact">
        <h2>{t('footer.title')}</h2>
        <p className="contact-subtitle">{t('footer.subtitle')}</p>
        <p><i className="fa-regular fa-envelope" aria-hidden="true"></i> garcia.maikelr@gmail.com</p>
        <p><i className="fa-solid fa-phone" aria-hidden="true"></i> +58 4121641006</p>

        <a
          href="https://wa.me/584121641006?text=Hola%20Maikel%2C%20me%20interesa%20un%20proyecto"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          aria-label={t('footer.whatsappAria')}
          style={{background: "#1fad54"}}
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> {t('footer.whatsappBtn')}
        </a>

        <div className="social">
          <a href="https://www.linkedin.com/in/maikel-garc%C3%ADa-8a3b60232/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg aria-hidden="true" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.31"><defs></defs><path fill="#0a66c2" fillRule="evenodd" d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z" /><path fill="#fff" fillRule="evenodd" d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z" /></svg>
            LinkedIn
          </a>
          <a href="https://es.fiverr.com/s/1q9xvbe" target="_blank" rel="noopener noreferrer" className="fiverr-link" aria-label="Fiverr">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.02 508.02"><defs></defs><circle fill="#1dbf73" cx="254.01" cy="254.01" r="254.01" /><circle fill="#fff" cx="315.97" cy="162.19" r="26.87" /><path fill="#fff" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)" /></svg>
            Fiverr
          </a>
        </div>
      </div>
      <div className="rights">
        {t('footer.copyright')} - {new Date().getFullYear()}
      </div>
    </footer>
  )
}
