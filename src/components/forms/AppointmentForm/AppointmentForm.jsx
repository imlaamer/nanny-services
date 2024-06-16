import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Textarea from '../../../uikit/Textarea/Textarea';
import Container from '../../common/Container/Container';
// import Icon from '../../common/Icon/Icon';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import appointmentFormValidationSchema from '../../../schemas/appointmentFormValidationSchema';

import './AntD.css';
import s from './AppointmentForm.module.css';

const AppointmentForm = ({ name, avatar }) => {
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(appointmentFormValidationSchema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  // const formatTime = (dateTimeStr) => {

  // };

  // const handleChange = () => {

  // };

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
                // name="address"
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
                // name="tel"
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
                // name="age"
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

            {/* <label>
            <Input type="time" name="time" placeholder="00:00" />
          </label> */}

            <div className={s.errorMessageBox}>
              <TimePicker
                className="input customInput appointmentWrappedInput"
                // {...register('time')}
                // className={
                //   errors.time?.message
                //     ? 'errorInput input customInput appointmentWrappedInput'
                //     : 'input customInput appointmentWrappedInput'
                // }
                // name="time"
                //00:00
                defaultValue={dayjs()}
                value={dayjs(selectedTime, 'HH:mm')}
                onCalendarChange={(value) => {
                  const timeString = dayjs(value).format('HH:mm');
                  setSelectedTime(timeString);
                  console.log(timeString);
                }}
                format="HH:mm"
                minuteStep="5"
                showNow={false}
                // value={
                //   isEditable
                //     ? dayjs(formatTime(time), 'h:mm A')
                //     : dayjs(time, 'h:mm A')
                // }
                // onChange={(value) => {
                //   setIsEditable(true);
                //   setTime(dayjs(value));
                // }}
                // value={
                //   isEditable
                //     ? dayjs(formatTime(time), 'h:mm A')
                //     : dayjs(defaultTime, 'h:mm A')
                // }
                // onChange={(value) =>
                //   isEditable
                //     ? setTime(dayjs(value))
                //     : setDefaultTime(dayjs(value).format('h:mm A'))
                // }
              />
              {/* <ErrorMessage errorMessage={errors.time?.message} className='appointmentErrMessage'  /> */}
            </div>
          </div>

          <div className={s.errorMessageBox}>
            <Input
              type="email"
              // name="email"
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
              // name="username"
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
            {/* <Input
            type="text"
            // name="comment"
            placeholder="Comment"
            {...register('comment')}
            className={
              errors.comment?.message
                ? 'errorInput appointmentWrappedInput'
                : 'appointmentWrappedInput'
            }
          /> */}

            <Textarea
              form="appointment-form"
              // name="comment"
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
            //   loading={loadingSave}
            //   disabled={loadingSave}
          />
        </form>
      </div>
    </Container>
  );
};

export default AppointmentForm;
