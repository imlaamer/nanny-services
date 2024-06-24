import { useState } from 'react';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Textarea from '../../../uikit/Textarea/Textarea';
import Container from '../../common/Container/Container';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import appointmentFormValidationSchema from '../../../schemas/appointmentFormValidationSchema';

import './AntD.css';
import s from './AppointmentForm.module.css';

const AppointmentForm = ({ name, avatar, handleCloseModal }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentFormValidationSchema),
    defaultValues: {
      time: '00:00',
    },
  });

  const onSubmitHandler = (data) => {
    const body = { data, nanny: name };
    toast.success('Appointment created successfully.');
    handleCloseModal();
  };

  return (
    <Container className="auth-container">
      <h2 className={s.title}>Make an appointment with a babysitter</h2>

      <div className={s.scrollContainer}>
        <p className={s.text}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

        <div className={s.avatarNameWrapper}>
          <img className={s.avatar} src={avatar} alt="nanny's avatar" />

          <div className={s.textWrapper}>
            <p className={s.accentText}>Your nanny</p>
            <p>{name}</p>
          </div>
        </div>

        <form
          className={s.form}
          onSubmit={handleSubmit(onSubmitHandler)}
          id="appointment-form"
        >
          <div className={s.formWapper}>
            <div className={s.errorMessageBox}>
              <Input
                type="address"
                placeholder="Address"
                {...register('address')}
                className={
                  errors.address?.message
                    ? 'errorInput appointmentWrappedInput'
                    : 'appointmentWrappedInput'
                }
              />
              <ErrorMessage
                errorMessage={errors.address?.message}
                className="appointmentErrMessage"
              />
            </div>

            <div className={s.errorMessageBox}>
              <Input
                type="tel"
                placeholder="+380"
                {...register('tel')}
                className={
                  errors.tel?.message
                    ? 'errorInput appointmentWrappedInput'
                    : 'appointmentWrappedInput'
                }
              />
              <ErrorMessage
                errorMessage={errors.tel?.message}
                className="appointmentErrMessage"
              />
            </div>

            <div className={s.errorMessageBox}>
              <Input
                type="text"
                placeholder="Child`s age"
                {...register('age')}
                className={
                  errors.age?.message
                    ? 'errorInput appointmentWrappedInput'
                    : 'appointmentWrappedInput'
                }
              />
              <ErrorMessage
                errorMessage={errors.age?.message}
                className="appointmentErrMessage"
              />
            </div>

            <div className={s.errorMessageBox}>
              <Controller
                name="time"
                control={control}
                defaultValue={dayjs().format('HH:mm')}
                render={({ field }) => (
                  <TimePicker
                    className="input customInput appointmentWrappedInput"
                    value={dayjs(field.value, 'HH:mm')}
                    onCalendarChange={(time) => {
                      const formattedTime = time ? time.format('HH:mm') : '';
                      field.onChange(formattedTime);
                    }}
                    format="HH:mm"
                    minuteStep="5"
                    showNow={false}
                  />
                )}
              />
              <ErrorMessage
                errorMessage={errors.time?.message}
                className="appointmentErrMessage"
              />
            </div>
          </div>

          <div className={s.errorMessageBox}>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={
                errors.age?.message
                  ? 'errorInput appointmentWrappedInput'
                  : 'appointmentWrappedInput'
              }
            />
            <ErrorMessage
              errorMessage={errors.email?.message}
              className="appointmentErrMessage"
            />
          </div>

          <div className={s.errorMessageBox}>
            <Input
              type="name"
              placeholder="Father's or mother's name"
              {...register('username')}
              className={
                errors.username?.message
                  ? 'errorInput appointmentWrappedInput'
                  : 'appointmentWrappedInput'
              }
            />
            <ErrorMessage
              errorMessage={errors.username?.message}
              className="appointmentErrMessage"
            />
          </div>

          <div className={s.lastErrorMessageBox}>
            <Textarea
              form="appointment-form"
              placeholder="Comment"
              {...register('comment')}
              className={
                errors.comment?.message
                  ? 'errorInput appointmentWrappedInput'
                  : 'textarea'
              }
            />
            <ErrorMessage
              errorMessage={errors.comment?.message}
              className="appointmentErrMessage"
            />
          </div>

          <Button
            type="submit"
            title="Send"
            className="formSendBtn"
            disabled={isDisabled}
          />
        </form>
      </div>
    </Container>
  );
};

export default AppointmentForm;
