import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleButtonClick = () => {
    navigate(`/lists`);
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <a href='/list/ad'>Create list</a>

      <Button onClick={handleButtonClick}>All my lists</Button>
    </div>
  );
};

export default Home;
