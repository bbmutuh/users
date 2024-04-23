import { useState, useEffect } from 'react';
import classnames from 'classnames';

import User from '../User';
import Button from '../ui/Button';
import Input from '../ui/Input';
import {ICONS} from '../../constants/iconsList';

import Styles from './styles.module.scss';

const Login = (
  {
    setUserObjFunc,
    users,
    loginIsOpen,
    loggedUser,
    handleLogin,
    toggleLoginOverlay,
    toggleConfirmOverlay,
    toggleChartOverlay,
    toggleEditOverlay,
  }) => {
  const [mail, setMail] = useState('');
  const [mailError, setMailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const loggingUser = users.find(users => users.mail === mail) || false;

  useEffect(() => {
    if (mailError === '' && passwordError === '') {
      handleLogin(loggingUser.id);
    }
  }, [mailError, passwordError]);

  const validateMail = (value) => {
    const userExist = users.some(users => users.mail === value);

    if (value === '') {
      setMailError('Заповніть поле');
    } else if (!userExist) {
      setMailError("Немає користувача з таким email'ом");
    } else {
      setMailError("");
    }
  };
  const validatePassword = (value) => {
    if (value === '') {
      setPasswordError('Заповніть поле');
    } else if (mail === '') {
      setPasswordError('Заповніть email');
    } else if (loggingUser.password !== password) {
      setPasswordError('Невірний пароль');
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className={Styles.container}>
      {loggedUser.id ? (
        <>Привіт, {loggedUser.name}</>
      ) : (
        <div className={Styles.loginLabel} onClick={toggleLoginOverlay}>Увійти</div>
      )}
      <Button
        icon={ICONS.CHART}
        bgColor="var(--green-1)"
        bgColorHover="var(--green-0)"
        bgColorActive="var(--green-1)"
        iconColor="invert(100%) sepia(100%) saturate(0%) hue-rotate(186deg) brightness(105%) contrast(101%)"
        iconColorHover="invert(100%) sepia(100%) saturate(0%) hue-rotate(186deg) brightness(105%) contrast(101%)"
        onClick={toggleChartOverlay}
      />
      <div className={classnames(Styles.wrapper, {
        [Styles.highIndex]: loginIsOpen
      })}>
        <Button
          icon={loggedUser.id ? ICONS.PERSON : ICONS.LOGIN}
          bgColor="var(--green-1)"
          bgColorHover="var(--green-0)"
          bgColorActive="var(--green-1)"
          iconColor="invert(100%) sepia(100%) saturate(0%) hue-rotate(186deg) brightness(105%) contrast(101%)"
          iconColorHover="invert(100%) sepia(100%) saturate(0%) hue-rotate(186deg) brightness(105%) contrast(101%)"
          onClick={toggleLoginOverlay}
        />
        {loginIsOpen && <div className={Styles.dropdown}>
          {loggedUser.id ? (
            <>
              <User
                setUserObjFunc={setUserObjFunc}
                className={Styles.profile}
                isLogged = {true}
                isAdmin={loggedUser.role === 'admin'}
                title={loggedUser.role === 'admin' && 'Admin'}
                id={loggedUser.id}
                loggedUser={loggedUser}
                user={loggedUser}
                toggleConfirmOverlay={toggleConfirmOverlay}
                toggleEditOverlay={toggleEditOverlay}
              />
              <Button
                fullWidth
                bgColor="#f2f2f2"
                bgColorHover="#e9e9e9"
                bgColorActive="#f2f2f2"
                onClick={() => {
                  handleLogin(false);
                  setMail('');
                  setPassword('');
                  setMailError(false);
                  setPasswordError(false);
                }}
              >
                Вийти
              </Button>
            </>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              validateMail(mail);
              validatePassword(password);
            }}>
              <Input
                label="Email"
                id="loginEmail"
                type="text"
                value={mail}
                errorMessage={mailError}
                onChange={(e) => setMail(e.target.value)}
              />
              <Input
                label="Пароль"
                id="loginPassword"
                type="password"
                value={password}
                errorMessage={passwordError}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                bgColor="#f2f2f2"
                bgColorHover="#e9e9e9"
                bgColorActive="#f2f2f2"
                type="submit"
              >
                Увійти
              </Button>
            </form>
          )}
        </div>}
      </div>
    </div>
  );
};

export default Login;
