import clsx from 'clsx';
import { Col, Row } from 'react-bootstrap';

import SmallButton from '../../common/SmallButton/SmallButton';

const SwitchSystem = ({ action, system }) => {
  // const [active, setActive] = useState();

  // const handleClick = (e) => {
  //   setActive(e.target.id);

  // }
  return (
    <div>
      <Row>
        <Col xs={1}></Col>
        <Col xs={3} className='d-flex align-items-center'>
          <h5 className='m-0'>Metric system:</h5>
        </Col>
        <Col xs={2}>
          <SmallButton
            onClick={action}
            className={clsx(system === 'metric' ? 'active' : undefined)}
          >
            Metric
          </SmallButton>
        </Col>
        <Col xs={2}>
          <SmallButton
            onClick={action}
            className={clsx(system === 'imperial' ? 'active' : undefined)}
          >
            Imperial
          </SmallButton>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

export default SwitchSystem;
