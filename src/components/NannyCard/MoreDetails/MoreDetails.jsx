import { forwardRef } from 'react';
import { useState } from 'react';
import Comment from './Comment/Comment';
import Button from '../../../uikit/Button/Button';
import Modal from '../../common/Modal/Modal';
import AppointmentForm from '../../forms/AppointmentForm/AppointmentForm';
import s from './MoreDetails.module.css';

export const MoreDetails = forwardRef(function MoreDetails(
  { reviews, name, avatar },
  ref
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ul className={s.list} ref={ref}>
      {reviews.map((review, index) => (
        <Comment review={review} key={index} />
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
          isOpen={isModalOpen}
        >
          <AppointmentForm
            name={name}
            avatar={avatar}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </ul>
  );
});

