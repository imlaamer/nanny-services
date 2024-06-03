import Container from '../../components/common/Container/Container';
import Dropdown from '../../components/Dropdown/Dropdown';
import NannyCard from '../../components/NannyCard/NannyCard';

import s from './NanniesPage.module.css';

const NanniesPage = () => {
  return (
    <section className={s.nannies}>
      <Container className="nanies-page-container">
        <Dropdown />
        <NannyCard />
      </Container>
    </section>
  );
};

export default NanniesPage;
