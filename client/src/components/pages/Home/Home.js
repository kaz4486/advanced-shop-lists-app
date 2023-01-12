import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/lists');
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
