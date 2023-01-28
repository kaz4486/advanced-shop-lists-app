import { Routes, Route } from 'react-router-dom';

import './styles/bootstrap.scss';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import AddList from './components/pages/AddList/AddList';
import Home from './components/pages/Home/Home';
import List from './components/pages/List/List';
import Lists from './components/pages/Lists/Lists';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='lists/:id' element={<List />} />
        <Route path='list/ad' element={<AddList />} />
        <Route path='lists' element={<Lists />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
