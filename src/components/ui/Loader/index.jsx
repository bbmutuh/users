import SpinnerIcon from './spinner.svg';

import Styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={Styles.container}>
      <img src={SpinnerIcon} alt=""/>
    </div>
  );
};

export default Loader;
