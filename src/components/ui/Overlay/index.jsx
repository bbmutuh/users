import classnames from 'classnames';

import Styles from './styles.module.scss';

const Overlay = ({ className, onClick, children }) => {
  return (
    <>
      <div
        className={classnames(Styles.overlay, className)}
        onClick={onClick}
      />
      {children}
    </>
  );
}

export default Overlay;
