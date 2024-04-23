import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

import Loader from './components/ui/Loader';
import Header from './components/Header';
import Search from "./components/Search";
import UserForm from './components/UserForm';
import User from './components/User';
import Overlays from './components/Overlays';
import Footer from './components/Footer';

import Styles from './index.module.scss';

function App() {
  // npx json-server -p 3500 -w data/db.json
  const API_URL = 'http://localhost:3500/users';

  const [users, setUsers] = useState([]);
  const [userObj, setUserObj] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [chartIsOpen, setChartIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [loggedId, setLoggedId] = useState(JSON.parse(localStorage.getItem('loggedId')));

  const loggedUser = users.find(users => users.id === loggedId) || [];
  const isAdmin = loggedUser.role === 'admin';

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
    setTimeout(() => fetchItems(), 1000);
  }, [users])

  const setUserObjFunc = (obj) => {
    setUserObj(obj);
  }
  const toggleLoginOverlay = () => {
    setLoginIsOpen(prev => !prev);
  };
  const toggleConfirmOverlay = () => {
    setConfirmIsOpen(prev => !prev);
  };
  const toggleChartOverlay = () => {
    setChartIsOpen(prev => !prev);
  };
  const toggleEditOverlay = () => {
    setEditIsOpen(prev => !prev);
  };
  const handleLogin = (id) => {
    setLoggedId(id);
    localStorage.setItem('loggedId', JSON.stringify(id));
    setLoginIsOpen(false);
  };

  const handleAdd = async (user) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const role = user.role;
    const name = user.name;
    const surname = user.surname;
    const mail = user.mail;
    const password = user.password;
    const company = user.company;
    const money = user.money;
    const newUser = { id, role, name, surname, mail, password, company, money };
    const listItems = [...users, newUser];
    setUsers(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleEdit = async (user) => {
    const id = user.id;

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        surname: user.surname,
        name: user.name,
        mail: user.mail,
        password: user.password,
        company: user.company
      })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);

    setEditIsOpen(false);
  };

  const handleDelete = async (id) => {
    setLoginIsOpen(false);
    if (loggedUser.role === 'user') {
      localStorage.setItem('loggedId', JSON.stringify(false));
      setLoggedId(false);
    }

    const listItems = users.filter((user) => user.id !== id);
    setUsers(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  return (
    <div className={Styles.container}>
      <Header
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
        handleEdit={handleEdit}
      />
      <main className={Styles.main}>
        {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={Styles.topBar}>
                <h2 className={Styles.listTitle}>
                  {search.length > 0 ? 'Знайдено' : 'Всього'} користувачів:
                  {' '}
                  <span>{users
                  .filter(item => (
                    (`${item.name} ${item.surname} ${item.company} ${item.mail} ${item.money}`).toLowerCase()
                  ).includes(search.toLowerCase())).length}</span>
                </h2>
                <Search
                  className={Styles.search}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
              <ul className={Styles.list}>
                {isAdmin && (
                  <li>
                    <UserForm
                      toCreate
                      title="Новий користувач"
                      submitLabel="Створити"
                      user={userObj}
                      users={users}
                      handleSubmit={handleAdd}
                    />
                  </li>
                )}
                {users
                .filter(item => (
                  (`${item.name} ${item.surname} ${item.company} ${item.mail} ${item.money}`).toLowerCase()
                ).includes(search.toLowerCase()))
                .map((user) => <li key = {user.id}>
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
        <Overlays
          users={users}
          userObj={userObj}
          loggedUser={loggedUser}
          loginIsOpen={loginIsOpen}
          setLoginIsOpen={setLoginIsOpen}
          editIsOpen={editIsOpen}
          setEditIsOpen={setEditIsOpen}
          confirmIsOpen={confirmIsOpen}
          setConfirmIsOpen={setConfirmIsOpen}
          chartIsOpen={chartIsOpen}
          setChartIsOpen={setChartIsOpen}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          fetchError={fetchError}
        />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
