import classnames from 'classnames';

import Styles from './styles.module.scss';

const Input = (
  {
    label,
    id,
    className,
    value,
    type,
    role,
    onChange,
    errorMessage,
    autoFocus,
    placeholder
  }) => {
  return (
    <div className={classnames(Styles.container, className)}>
      {label && <label className={Styles.label} htmlFor={id}>{label}</label>}
      <input
        autoComplete="off"
        autoFocus={autoFocus}
        id={id}
        type={type}
        role={role}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classnames(Styles.input, {
          [Styles.hasError]: errorMessage
        })}
      />
      <span className={Styles.error}>{errorMessage}</span>
    </div>
  );
};

export default Input;
