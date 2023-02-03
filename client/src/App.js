import { Routes, Route } from 'react-router-dom';

import './styles/bootstrap.scss';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import AddList from './components/pages/AddList/AddList';
import Home from './components/pages/Home/Home';
import List from './components/pages/List/List';
import Lists from './components/pages/Lists/Lists';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import { AUTH_URL } from './config/config';
import Logout from './components/pages/LogOut/LogOut';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIn } from './redux/userRedux';

const App = () => {
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ login, password }),
  //   credentials: 'include',
  // };

  const dispatch = useDispatch();

  // fetch(`${AUTH_URL}/user`).then((res) => {
  //   console.log(res);
  //   if (res.status === 401) {
  //     return;
  //   }
  //   .then((res) => {
  //     res.json();
  //   })
  //   const user = res.json();
  //   console.log(user);
  //   dispatch(logIn(user.login));
  // });

  // fetch(`${AUTH_URL}/user`, {
  //   headers: { Accept: 'application/json' },
  // })
  //   .then((res) => {
  //     res.json();
  //   })
  //   .then((res) => console.log(res))
  //   .catch((err) => {
  //     // setStatus('serverError');
  //   });

  //   fetch('https://reqbin.com/echo/get/json', {
  //     method: 'GET',
  //     headers: {
  //         'Accept': 'application/json',
  //     },
  // })
  // .then(response => response.json())
  // .then(response => console.log(JSON.stringify(response)))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const saved = localStorage.getItem(key);
      // const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      // return initial;

      const loggedInUser = localStorage.getItem('user');
      if (typeof loggedInUser === 'string') {
        // const foundUser =
        //   loggedInUser !== null ? JSON.parse(loggedInUser) : undefined;
        // console.log(foundUser);
        const foundUser = JSON.parse(loggedInUser);
        console.log(foundUser.login);
        dispatch(logIn(foundUser));
        // dispatch(logIn(foundUser.login));
      }
    }
  });

  // const loadUser = async () => {
  //   const res = await fetch(`${AUTH_URL}/user`);

  //   const user = await res.json();
  //   dispatch(logIn(user));
  // };
  // loadUser();

  // const loadUser = async () => {
  //   const response = await fetch(`${AUTH_URL}/user`);
  //   const user = await response.json();
  //   console.log(user);
  // };
  // loadUser();

  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='lists/:id' element={<List />} />
        <Route path='list/ad' element={<AddList />} />
        <Route path='lists' element={<Lists />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
