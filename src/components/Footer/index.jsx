import Styles from './styles.module.scss';

const Footer = () => {
  const today = new Date();
  return (<footer className={Styles.footer}>
    <small>Powered by Mutuh Development</small> &copy; {today.getFullYear()}
  </footer>)
}

export default Footer;
