import Button from '../../../uikit/Button/Button';
import Input from '../../../uikit/Input/Input';
import Container from '../../common/Container/Container';
// import Icon from '../../common/Icon/Icon';

import s from './AppointmentForm.module.css';

const AppointmentForm = () => {
  return (
    <Container className="auth-container">
      <h2 className={s.title}>Make an appointment with a babysitter</h2>
      <p className={s.text}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className={s.avatarNameWrapper}>
        <img
          className={s.avatar}
          src="https://ftp.goit.study/img/avatars/10.jpg"
          alt="nanny`s avatar"
        />

        <div className={s.textWrapper}>
          <p className={s.accentText}>Your nanny</p>
          <p>Anna Shevchenko</p>
        </div>
      </div>

      <form className={s.form}>
        <div className={s.formWapper}>
          <Input
            type="address"
            name="address"
            placeholder="Address"
            className="appointmentWrappedInput"
          />

          <Input
            type="tel"
            name="tel"
            placeholder="+380"
            className="appointmentWrappedInput"
          />

          <Input
            type="text"
            name="age"
            placeholder="Child`s age"
            className="appointmentWrappedInput"
          />

          {/* ліба для часу ? */}
          <label>
            <Input type="time" name="time" placeholder="00:00" />
          </label>
        </div>

        <Input type="email" name="email" placeholder="Email" />

        <Input
          type="name"
          name="username"
          placeholder="Father's or mother's name"
        />

        <Input type="text" name="text" placeholder="Comment" />

        <Button
          type="submit"
          title="Send"
          className="formSendBtn"
          //   loading={loadingSave}
          //   disabled={loadingSave}
        />
      </form>
    </Container>
  );
};

export default AppointmentForm;
