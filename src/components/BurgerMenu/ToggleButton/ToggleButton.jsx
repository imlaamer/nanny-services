import { motion } from 'framer-motion';
import { useState } from 'react';

import s from './ToggleButton.module.css';

const ToggleButton = ({
  setOpen,
  isHomePage,
  isToggleStroke = false,
  setIsToggleStroke,
  handleCloseModal,
}) => {
  // const [isToggleStroke, setIsToggleStroke] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
    handleCloseModal();

    // setIsToggleStroke(!isToggleStroke);
  };

  //!HomePage !!
  //className

  return (
    <button
      // onClick={() => setOpen((prev) => !prev)}
      onClick={handleClick}
      className={isHomePage ? s.button : s.coloredHeaderBtn}
    >
      <svg width="26" height="26" viewBox="0 0 23 23">
        <motion.path
          strokeWidth="2"
          stroke={isToggleStroke ? '#262626' : '#fbfbfb'}
          strokeLinecap="round"
          variants={
            {
              // visible: { d: 'M 2 2.5 L 20 2.5' },
              // hidden: { d: 'M 3 16.5 L 17 2.5' },
              // closed: { d: 'M 2 2.5 L 20 2.5' },
              // open: { d: 'M 3 16.5 L 17 2.5' },
            }
          }
        />
        <motion.path
          strokeWidth="2"
          stroke={isToggleStroke ? '#262626' : '#fbfbfb'}
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          variants={{
            // closed: { opacity: 1 },
            // open: { opacity: 0 },
            visible: { opacity: 1 },
            // hidden: { opacity: 0 },
          }}
        />
        <motion.path
          strokeWidth="2"
          stroke={isToggleStroke ? '#262626' : '#fbfbfb'}
          strokeLinecap="round"
          variants={
            {
              // visible: { d: 'M 2 16.346 L 20 16.346' },
              // hidden: { d: 'M 3 2.5 L 17 16.346' },
              // closed: { d: 'M 2 16.346 L 20 16.346' },
              // open: { d: 'M 3 2.5 L 17 16.346' },
            }
          }
        />
      </svg>
    </button>
  );
};

export default ToggleButton;
