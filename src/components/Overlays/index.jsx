import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import classnames from 'classnames';

import Overlay from '../ui/Overlay';
import Button from '../ui/Button';
import UserForm from '../UserForm';

import Styles from './styles.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Overlays = (
  {
    loginIsOpen,
    setLoginIsOpen,
    confirmIsOpen,
    setConfirmIsOpen,
    editIsOpen,
    setEditIsOpen,
    chartIsOpen,
    setChartIsOpen,
    users,
    userObj,
    handleEdit,
    handleDelete,
    fetchError
  }
) => {
  const usersNames = users.map(users => `${users.name} ${users.surname}`);
  const usersMoney = users.map(users => users.money);
  const DoughnutData = {
    labels: usersNames,
    datasets: [
      {
        label: 'Грошей витрачено (₴)',
        data: usersMoney,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (<>
    {loginIsOpen && (
      <Overlay onClick={() => setLoginIsOpen(false)} />
    )}
    {confirmIsOpen && (
      <Overlay
        className={Styles.topOverlay}
        onClick={() => setConfirmIsOpen(false)}
      >
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
                handleDelete(userObj.id);
              }}
            >
              Так
            </Button>
          </div>
        </div>
      </Overlay>
    )}
    {editIsOpen && (
      <Overlay
        className={Styles.topOverlay}
        onClick={() => setEditIsOpen(false)}
      >
        <UserForm
          className={Styles.editForm}
          title="Редагувати користувача"
          submitLabel="Змінити"
          users={users}
          user={userObj}
          handleSubmit={handleEdit}
        />
      </Overlay>
    )}
    {fetchError && (
      <Overlay className={classnames(Styles.topOverlay, Styles.cursorDefault)}>
        <div className={Styles.errorWrapper}>
          {fetchError === 'Failed to fetch' ? (
            <>
              To start json-server run:
              <br />
              npx json-server -p 3500 -w data/db.json
            </>
          ) : (
            <>
              {`Error: ${fetchError}`}
            </>
          )}
        </div>
      </Overlay>
    )}
    {chartIsOpen && (
      <Overlay
        className={Styles.topOverlay}
        onClick={() => setChartIsOpen(false)}
      >
        <div className={Styles.chartWrapper}>
          <Doughnut data={DoughnutData} />
        </div>
      </Overlay>
    )}
  </>);
};

export default Overlays;
