import clsx from 'clsx';
import Button from '../../common/Button/Button';

const SwitchSystem = ({ action, system }) => {
  return (
    <div>
      <Button
        onClick={action}
        className={clsx(system === 'metric' && 'active')}
      >
        Metric
      </Button>
      <Button
        onClick={action}
        className={clsx(system === 'imperial' && 'active')}
      >
        Imperial
      </Button>
    </div>
  );
};

export default SwitchSystem;
