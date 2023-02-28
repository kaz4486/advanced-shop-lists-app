import clsx from 'clsx';
import styles from './SmallButton.module.scss';

const SmallButton = ({ children, onClick, type, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        styles.button,
        className === 'active' ? styles.active : undefined,
        className === 'red' ? styles.red : undefined
      )}
    >
      {children}
    </button>
  );
};

export default SmallButton;
