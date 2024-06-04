import { forwardRef } from 'react';
import { useState } from 'react';

import Comment from './Comment/Comment';
import Button from '../../../uikit/Button/Button';
import Modal from '../../common/Modal/Modal';
import AppointmentForm from '../../forms/AppointmentForm/AppointmentForm';

import s from './MoreDetails.module.css';

export const MoreDetails = forwardRef(function MoreDetails(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ul className={s.list} ref={ref}>
      {[...Array(5)].map((comment, index) => (
        <li key={index}>
          <Comment />
        </li>
      ))}

      <Button
        className="makeAppointmentBtn"
        title="Make an appointment"
        onClick={handleOpen}
      />

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          className="appointmentModal"
          // isOpen={isLogModalOpen}
        >
          <AppointmentForm />
        </Modal>
      )}
    </ul>
  );
});

// export default MoreDetails;
