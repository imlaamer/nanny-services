import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './ErrorPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>
          <span className={s.text}>Oopsie!</span> We could not find this page
        </h1>
        <div className={s.description}>
          Mistakes happen... and that is okay. You will be redirected to
          <span className={s.accent}> The Home Page</span> and start your
          journey from there after
          <span className={s.accent}> {countdown} seconds.</span>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
