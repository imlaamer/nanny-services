import Container from '../../components/common/Container/Container';

import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={s.hero}>
      <Container className="home-page-container"></Container>
    </section>
  );
};

export default HomePage;
