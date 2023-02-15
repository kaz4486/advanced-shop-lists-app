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
import Logout from './components/pages/LogOut/LogOut';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIn } from './redux/userRedux';
import EditList from './components/pages/EditList/EditList';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('user');
      if (typeof loggedInUser === 'string') {
        const foundUser = JSON.parse(loggedInUser);
        console.log(foundUser.login);
        dispatch(logIn(foundUser));
      }
    }
  });

  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='lists/:id' element={<List />} />
        <Route path='list/ad' element={<AddList />} />
        <Route path='lists/edit/:id' element={<EditList />} />
        <Route path='lists' element={<Lists />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
