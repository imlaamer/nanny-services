import Container from '../../components/common/Container/Container';

import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={s.hero}>
      <div className={s.leftBox}>
        <Container className="home-page-container"></Container>
      </div>
      <div className={s.rightBox}>
        <Container className="home-page-container"></Container>
      </div>
    </section>
  );
};

export default HomePage;
