import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ children, onClick, type, className, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        styles.button,
        className === 'active' ? styles.active : undefined,
        className === 'red' ? styles.red : undefined
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
