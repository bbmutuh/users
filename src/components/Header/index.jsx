import Styles from './styles.module.scss';
import Logo from './img/logo.svg';
import Login from '../Login';

const Header = (
  {
    setUserObjFunc,
    users,
    loginIsOpen,
    chartIsOpen,
    loggedUser,
    handleLogin,
    toggleLoginOverlay,
    toggleConfirmOverlay,
    toggleChartOverlay,
    toggleEditOverlay
  }) => {
  return (<header className={Styles.header}>
    <div className={Styles.logoWrapper}>
      <a href="/">
        <img className={Styles.logo} src={Logo} alt="Логотип компанії"/>
      </a>
      <div className={Styles.slogan}>
        <span>Створюй!</span>
        <span>Змінюй.</span>
        <span>Видаляй...</span>
      </div>
    </div>
    <Login
      setUserObjFunc={setUserObjFunc}
      users={users}
      loginIsOpen={loginIsOpen}
      chartIsOpen={chartIsOpen}
      loggedUser={loggedUser}
      handleLogin={handleLogin}
      toggleLoginOverlay={toggleLoginOverlay}
      toggleConfirmOverlay={toggleConfirmOverlay}
      toggleChartOverlay={toggleChartOverlay}
      toggleEditOverlay={toggleEditOverlay}
    />
  </header>)
}

export default Header;
