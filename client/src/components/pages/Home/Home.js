import { Row } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faThList } from '@fortawesome/free-solid-svg-icons';
import DocumentMeta from 'react-document-meta';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/lists`);
  };

  const meta = {
    name: 'google-site-verification',
    content: 'Xf_04ZdDmMtG8HXsuZGAwXmNP97gU3nsjIIybp1En1s',
  };

  return (
    <div>
      <DocumentMeta {...meta} />
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL +
            '/images/pexels-photomix-company-868110.jpg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className={styles.home}
      >
        <Row className={styles.row}>
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
