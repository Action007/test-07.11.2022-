import scss from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={scss.wrap}>
      <div className={scss.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;