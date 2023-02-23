import clsx from 'clsx';

import Button from '../../common/Button/Button';

const SwitchSystem = ({ action, system }) => {
  // const [active, setActive] = useState();

  // const handleClick = (e) => {
  //   setActive(e.target.id);

  // }
  return (
    <div>
      <Button
        onClick={action}
        className={clsx(system === 'metric' ? 'active' : undefined)}
      >
        Metric
      </Button>
      <Button
        onClick={action}
        className={clsx(system === 'imperial' ? 'active' : undefined)}
      >
        Imperial
      </Button>
    </div>
  );
};

export default SwitchSystem;
