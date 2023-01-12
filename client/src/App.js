import { Routes, Route } from 'react-router-dom';

import './styles/bootstrap.scss';
import './styles/global.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import AdList from './components/pages/AdList/AdList';
import Home from './components/pages/Home/Home';
import List from './components/pages/List/List';
import Lists from './components/pages/Lists/Lists';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='list' element={<List />} />
        <Route path='list/ad' element={<AdList />} />
        <Route path='lists' element={<Lists />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
