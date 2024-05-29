import { useLocation } from 'react-router-dom';
import Container from '../../components/common/Container/Container';

import s from './NanniesPage.module.css';

const NanniesPage = () => {
  return (
    <section className={s.nannies}>
      <Container className="nanies-page-container"></Container>
    </section>
  );
};

export default NanniesPage;
