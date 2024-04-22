import classnames from 'classnames';

import EditButton from './components/EditButton';
import DeleteButton from './components/DeleteButton';
import Icon from '../ui/Icon';
import {ICONS} from '../../constants/iconsList';
import {numberWithSpaces} from '../../helpers/fn';

import Styles from './styles.module.scss';

const User = (
  {
    loggedUser,
    isLogged,
    isAdmin,
    setUserObjFunc,
    user,
    title,
    className,
    toggleConfirmOverlay,
    toggleEditOverlay
  }) => {
  return (<div className={classnames(Styles.item, className, {
    [Styles.isLogged]: isLogged,
    [Styles.isAdmin]: isAdmin
  })}>
    <div className={Styles.header}>
      {title}
      <div className={Styles.buttons}>
        {(loggedUser.role === 'admin' || user.id === loggedUser.id) && <EditButton
          role={user.role}
          onClick={()=> {
            toggleEditOverlay();
            setUserObjFunc(user);
          }}
        />}
        {(loggedUser.role === 'admin' && user.role !== 'admin' || user.id === loggedUser.id && user.role !== 'admin') && <DeleteButton
          role={user.role}
          onClick={()=> {
            toggleConfirmOverlay();
          }}
        />}
      </div>
    </div>
    <div className={Styles.body}>
      <div className={Styles.row}>
        <Icon src={ICONS.PERSON} className={Styles.icon} />
        <span className={Styles.overflow} title={`${user.name} ${user.surname}`}>{user.name} {user.surname}</span>
      </div>
      <div className={Styles.row}>
        <Icon src={ICONS.MAIL} className={classnames(Styles.icon, Styles.mail)} />
        <a className={Styles.overflow} href={`mailto:${user.mail}`} title={user.mail}>{user.mail}</a>
      </div>
      <div className={Styles.row}>
        <Icon src={ICONS.COMPANY} className={classnames(Styles.icon, Styles.company)} />
        <span className={Styles.overflow} title={user.company}>{user.company}</span>
      </div>
      <div className={Styles.row}>
        <Icon src={ICONS.MONEY} className={classnames(Styles.icon, Styles.money)} />
        <span className={Styles.overflow} title="Грошей витрачено">{numberWithSpaces(user.money)} ₴</span>
      </div>
    </div>
  </div>)
};

User.defaultProps = {
  isLogged: false,
  loggedUser: null
};

export default User;
