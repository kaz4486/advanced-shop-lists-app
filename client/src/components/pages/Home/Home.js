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
    <div>
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL +
            '/images/pexels-photomix-company-868110.jpg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',

          // width: '800px',
          // height: '800px',
          // objectFit: 'cover',
        }}
        className={styles.home}
      >
        <Row className={styles.row}>
          {/* <img
            src={`${process.env.PUBLIC_URL}/images/pexels-photomix-company-868110.jpg`}
            alt='groceries'
          /> */}
          <div className={styles.text_background}>
            <h1>Make shopping lists great again!</h1>
          </div>
          <div className={styles.buttons}>
            <div className='d-flex justify-content-center'>
              <Link to={'/list/ad'} className='m-4'>
                {' '}
                <Button>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className={styles.icon}
                  />
                  Create list
                </Button>
              </Link>
              <div className='m-4'>
                <Button onClick={handleButtonClick}>
                  <FontAwesomeIcon icon={faThList} className={styles.icon} />
                  All my lists
                </Button>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Home;
