import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Container from '../../components/common/Container/Container';
import Icon from '../../components/common/Icon/Icon';

import { resetNannies } from '../../redux/nannies/nanniesSlice';

import s from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

  const handleHover = () => {
    setIsHover(true);
  };

  const handleResetHover = () => {
    setIsHover(false);
  };

  useEffect(() => {
    dispatch(resetNannies());
  }, [dispatch]);

  return (
    <section className={s.hero}>
      <div className={s.leftBox}>
        <Container className="hero-colored-container">
          <h1 className={s.heroTitle}>Make Life Easier for the Family:</h1>
          <h2 className={s.heroSubTitle}>
            Find Babysitters Online for All Occasions
          </h2>
          <NavLink
            className={({ isActive }) =>
              `${s.navLink} ${isActive ? s.active : ''}`
            }
            to="/nannies"
            onMouseOver={handleHover}
            onMouseLeave={handleResetHover}
          >
            <p>Get started</p>
            {!isHover && (
              <Icon
                id="arrow-up-right"
                width="15"
                height="15"
                stroke="#fbfbfb"
                fill="#fbfbfb"
              />
            )}

            {isHover && (
              <Icon
                id="arrow-right"
                width="15"
                height="15"
                stroke="#fbfbfb"
                fill="#fbfbfb"
              />
            )}
          </NavLink>
        </Container>
      </div>
      <div className={s.rightBox}>
        <div className={s.heroImgContainer}>
          <div className={s.statisticWrapper}>
            <div className={s.statisticIconBox}>
              <Icon
                id="check"
                width="30"
                height="30"
                fill="#FBFBFB"
                stroke="#FBFBFB"
              />
            </div>
            <div className={s.statisticTextBox}>
              <p className={s.statisticText}>Experienced nannies</p>
              <p className={s.accentText}>15,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
