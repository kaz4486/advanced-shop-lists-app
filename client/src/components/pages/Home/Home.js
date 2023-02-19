import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import Button from '../../common/Button/Button';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // const user = useSelector(getUser);

  const handleButtonClick = () => {
    navigate(`/lists`);
  };

  return (
    <section className={styles.home}>
      <img
        src={`${process.env.PUBLIC_URL}/images/pexels-photomix-company-868110.jpg`}
        alt='groceries'
      />
      <div className={styles.text_background}>
        <h1>Make shopping lists great again!</h1>
      </div>
      <div className={styles.buttons}>
        <Row>
          <Col xs={0} md={2} lg={3}></Col>
          <Col xs={12} md={4} lg={3} className='text-center mb-3'>
            <Link to={'/list/ad'}>
              {' '}
              <Button>Create list</Button>
            </Link>
          </Col>
          <Col xs={12} md={4} lg={3} className='text-center'>
            <Button onClick={handleButtonClick}>All my lists</Button>
          </Col>
          <Col xs={0} md={2} lg={3}></Col>
        </Row>
      </div>
    </section>
  );
};

export default Home;
