import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ToggleButton from './ToggleButton/ToggleButton';

// import NavItem from '../Navigation/NavItem/NavItem';
// import { navConfig } from '../../data/navigation';
import s from './BurgerMenu.module.css';

const variants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 20,
      duration: 0.2,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      // delay: 0.5,
      delay: 0.2,
      type: 'spring',
      stiffness: 450,
      damping: 40,
      duration: 0.5,
    },
  },
};

const BurgerMenu = ({ isNanniesPage }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(`.${s.sidebar}`) &&
        !event.target.closest(`.${s.button}`)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <motion.div className={s.sidebar} animate={isOpen ? 'open' : 'closed'}>
      <motion.div className={isOpen ? s.bg : ''} variants={variants}>
        <nav className={s.container}>
          {/* {navConfig.map(({ id, name, path }) => (
            <NavItem key={id} name={name} to={path} />
          ))} */}
        </nav>
      </motion.div>
      <ToggleButton setOpen={setOpen} isNanniesPage={isNanniesPage} />
    </motion.div>
  );
};

export default BurgerMenu;
