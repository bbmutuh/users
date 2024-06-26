import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { isEmail } from '../../helpers/fn';
import Input from '../ui/Input';
import Button from '../ui/Button';

import Styles from './styles.module.scss';

const UserForm = (
  {
    user,
    className,
    title,
    users,
    submitLabel,
    handleSubmit,
    toCreate
  }) => {
  const [surname, setSurname] = useState(user.surname || '');
  const [surnameError, setSurnameError] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [nameError, setNameError] = useState(false);
  const [mail, setMail] = useState(user.mail || '');
  const [mailError, setMailError] = useState(false);
  const [company, setCompany] = useState(user.company || '');
  const [companyError, setCompanyError] = useState(false);
  const [password, setPassword] = useState(user.password || '');
  const [passwordError, setPasswordError] = useState(false);
  const [money, setMoney] = useState(user.money || '');
  const [moneyError, setMoneyError] = useState(false);

  const handleSurnameChange = (event) => {
    const result = event.target.value.replace(/[^a-zа-яії']/gi, '');

    setSurname(result);
  };
  const handleNameChange = (event) => {
    const result = event.target.value.replace(/[^a-zа-яії']/gi, '');

    setName(result);
  };
  const handleMoneyChange = (event) => {
    const result = event.target.value.replace(/[^0-9']/gi, '');

    setMoney(Number(result));
  };

  const validateSurname = (value) => {
    if (value === '') {
      setSurnameError('Заповніть поле');
    } else {
      setSurnameError("");
    }
  };
  const validateName = (value) => {
    if (value === '') {
      setNameError('Заповніть поле');
    } else {
      setNameError("");
    }
  };
  const validateMail = (value) => {
    const userExist = users.some(users => users.mail === value);

    if (value === '') {
      setMailError('Заповніть поле');
    } else if (!isEmail(value)) {
      setMailError('Введіть коректний email');
    } else if (userExist && value !== user.mail) {
      setMailError("Користувач з таким email'ом вже є");
    } else {
      setMailError("");
    }
  };
  const validateCompany = (value) => {
    if (value === '') {
      setCompanyError('Заповніть поле');
    } else {
      setCompanyError("");
    }
  };
  const validatePassword = (value) => {
    if (value === '') {
      setPasswordError('Заповніть поле');
    } else if (value.length < 3) {
      setPasswordError('Мінімум три символи');
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (
      surnameError === ''
      && nameError === ''
      && mailError === ''
      && companyError === ''
      && passwordError === '') {
       if (toCreate) {
         const newUser = {
           id: 0,
           role: 'user',
           name: name,
           surname: surname,
           mail: mail,
           password: password,
           company: company,
           money: money || 0
         };
         setName('');
         setSurname('');
         setMail('');
         setPassword('');
         setCompany('');
         setMoney('');
         handleSubmit(newUser);
       } else {
         const editedUser = {
           id: user.id,
           role: user.role,
           name: name,
           surname: surname,
           mail: mail,
           password: password,
           company: company,
           money: user.money
         };
         handleSubmit(editedUser);
       }
    }
  }, [surnameError, nameError, mailError, companyError, passwordError]);

  return (
    <form
      className={classnames(Styles.form, className)}
      onSubmit={(e) => {
        e.preventDefault();
        validateSurname(surname);
        validateName(name);
        validateMail(mail);
        validateCompany(company);
        validatePassword(password);
      }}
    >
      <div className={Styles.title}>{title}</div>
      <Input
        autoFocus
        className={Styles.input}
        type="text"
        id="surname"
        label="Прізвище"
        value={surname}
        errorMessage={surnameError}
        onChange={handleSurnameChange}
      />
      <Input
        className={Styles.input}
        type="text"
        id="name"
        label="Ім'я"
        value={name}
        errorMessage={nameError}
        onChange={handleNameChange}
      />
      <Input
        className={Styles.input}
        type="text"
        id="email"
        label="Email"
        value={mail}
        errorMessage={mailError}
        onChange={(e) => setMail(e.target.value)}
      />
      <Input
        className={Styles.input}
        type="text"
        id="company"
        label="Компанія"
        value={company}
        errorMessage={companyError}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Input
        className={Styles.input}
        type="password"
        id="password"
        label="Пароль"
        value={password}
        errorMessage={passwordError}
        onChange={(e) => setPassword(e.target.value)}
      />
      {toCreate && <Input
        className={Styles.input}
        type="text"
        id="money"
        label="Грошей витрачено"
        value={money}
        errorMessage={moneyError}
        onChange={handleMoneyChange}
      />}
      <Button
        fullWidth
        color="var(--green-4)"
        bgColor="var(--green-2)"
        bgColorHover="var(--green-1)"
        bgColorActive="var(--green-2)"
      >
        {submitLabel}
      </Button>
    </form>
  );
};

UserForm.defaultProps = {

};

export default UserForm;
