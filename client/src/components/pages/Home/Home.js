import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import Button from '../../common/Button/Button';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faThList } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const navigate = useNavigate();
  // const user = useSelector(getUser);

  const handleButtonClick = () => {
    navigate(`/lists`);
  };

  return (
    <div className={styles.home}>
      <Row className='w-100 m-0 p-0'>
        <img
          src={`${process.env.PUBLIC_URL}/images/pexels-photomix-company-868110.jpg`}
          alt='groceries'
        />
        <div className={styles.text_background}>
          <h1>Make shopping lists great again!</h1>
        </div>
        <div className={styles.buttons}>
          <Row className='d-flex justify-content-center'>
            <Col
              xs={12}
              md={6}
              className='text-center d-flex justify-content-end '
            >
              <Link to={'/list/ad'}>
                {' '}
                <Button>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className={styles.icon}
                  />
                  Create list
                </Button>
              </Link>
            </Col>
            <Col
              xs={12}
              md={6}
              className='text-center d-flex justify-content-start'
            >
              <Button onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faThList} className={styles.icon} />
                All my lists
              </Button>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default Home;
