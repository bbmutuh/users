import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

import Loader from './components/ui/Loader';
import Header from './components/Header';
import UserForm from './components/UserForm';
import User from './components/User';
import Footer from './components/Footer';
import Button from './components/ui/Button';

import Styles from './index.module.scss';
import classnames from "classnames";

function App() {
  // json-server 0.17.4
  // npm i json-server@0.17.4
  // npx json-server -p 3500 -w data/db.json
  const API_URL = 'http://localhost:3500/users';

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [userObj, setUserObj] = useState(false);
  const [users, setUsers] = useState([]);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [loggedId, setLoggedId] = useState(JSON.parse(localStorage.getItem('loggedId')));

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setUsers(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => fetchItems(), 2000);

  }, [])

  const loggedUser = users.find(users => users.id === loggedId) || [];
  const isAdmin = loggedUser.role === 'admin';

  const setUserObjFunc = (obj) => {
    setUserObj(obj);
  }
  const toggleLoginOverlay = () => {
    setLoginIsOpen(prev => !prev);
  };
  const toggleConfirmOverlay = () => {
    setConfirmIsOpen(prev => !prev);
  };
  const toggleEditOverlay = () => {
    setEditIsOpen(prev => !prev);
  };
  const handleLogin = (id) => {
    setLoggedId(id);
    localStorage.setItem('loggedId', JSON.stringify(id));
    setLoginIsOpen(false);
  };
  const handleAdd = () => {
    console.log('add');
  };
  const handleEdit = () => {
    console.log('edit');
    setEditIsOpen(false);
  };
  const handleDelete = () => {
    setLoginIsOpen(false);
    if (loggedUser.role === 'user') {
      localStorage.setItem('loggedId', JSON.stringify(false));
      setLoggedId(false);
    }
    console.log('delete');
  };

  return (
    <div className={Styles.container}>
      <Header
        setUserObjFunc={setUserObjFunc}
        users={users}
        loginIsOpen={loginIsOpen}
        loggedUser={loggedUser}
        handleLogin={handleLogin}
        toggleLoginOverlay={toggleLoginOverlay}
        toggleConfirmOverlay={toggleConfirmOverlay}
        toggleEditOverlay={toggleEditOverlay}
        handleEdit={handleEdit}
      />
      <main className={Styles.main}>
        {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2 className={Styles.listTitle}>Всього користувачів: <span>{users.length}</span></h2>
              <ul className={Styles.list}>
                {isAdmin && (
                  <li>
                    <UserForm
                      title="Новий користувач"
                      submitLabel="Створити"
                      user={userObj}
                      users={users}
                      handleSubmit={handleAdd}
                      loggedUser={false}
                    />
                  </li>
                )}
                {users.map((user) => <li key = {user.id}>
                  <User
                    setUserObjFunc={setUserObjFunc}
                    isLogged = {user.id === loggedId}
                    isAdmin={user.role === 'admin'}
                    title={user.role === 'admin' && 'Admin'}
                    user={user}
                    loggedUser={loggedUser}
                    toggleConfirmOverlay={toggleConfirmOverlay}
                    toggleEditOverlay={toggleEditOverlay}
                  />
                </li>)}
              </ul>
            </>
        )}
      </main>
      <Footer/>

      {loginIsOpen && (
        <div
          className={Styles.overlay}
          onClick={() => setLoginIsOpen(false)}
        />
      )}
      {confirmIsOpen && (
        <>
          <div
            className={classnames(Styles.overlay, Styles.topOverlay)}
            onClick={() => setConfirmIsOpen(false)}
          />
          <div className={Styles.confirmContainer}>
            <div className={Styles.confirmTitle}>
              Ви впевнені?
            </div>
            <div className={Styles.confirmButtons}>
              <Button
                bgColor="#f2f2f2"
                bgColorHover="#e9e9e9"
                bgColorActive="#f2f2f2"
                onClick={() => setConfirmIsOpen(false)}
              >
                Ні
              </Button>
              <Button
                color="var(--green-4)"
                bgColor="var(--green-2)"
                bgColorHover="var(--green-1)"
                bgColorActive="var(--green-2)"
                onClick={() => {
                  setConfirmIsOpen(false);
                  handleDelete();
                }}
              >
                Так
              </Button>
            </div>
          </div>
        </>
      )}
      {editIsOpen && (
        <>
          <div
            className={classnames(Styles.overlay, Styles.topOverlay)}
            onClick={() => setEditIsOpen(false)}
          />
          <UserForm
            className={Styles.editForm}
            title="Редагувати користувача"
            submitLabel="Змінити"
            users={users}
            user={userObj}
            loggedUser={loggedUser}
            handleSubmit={handleEdit}
          />
        </>
      )}
      {fetchError && (
        <div className={classnames(Styles.overlay, Styles.topOverlay, Styles.cursorDefault)}>
          <div className={Styles.errorWrapper}>
          {`Error: ${fetchError}`}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
