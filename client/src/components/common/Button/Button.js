import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ children, onClick, type, className }) => {
  console.log(className);
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        styles.button,
        className === 'active' ? styles.active : undefined
      )}
    >
      {children}
    </button>
  );
};

export default Button;
