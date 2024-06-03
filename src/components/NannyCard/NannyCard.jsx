import s from './NannyCard.module.css';

const NannyCard = () => {
  //   const detailsBlocks = {
  //     age: 27,
  //     experience: '5 years',
  //     kids_age: '1 to 6 years old',
  //     characters: ['patient', 'energetic', 'creative', 'punctual'],
  //     education: 'Bachelor’s in Early Childhood Education, First Aid Certified',
  //   };

  const detailsBlocks = {
    Age: 27,
    Experience: '5 years',
    'Kids Age': '1 to 6 years old',
    Characters: ['patient', 'energetic', 'reative', 'punctual'],
    Education: 'Bachelor’s in Early Childhood Education, First Aid Certified',
  };

  const keys = Object.keys(detailsBlocks);

  return (
    <div className={s.wrapper}>
      <div className={s.avatarWrapper}>
        <div className={s.avatarUserStatusBox}>
          <img
            src="https://ftp.goit.study/img/avatars/10.jpg"
            alt="nanny`s avatar"
          />
          <div className={s.statusBox}></div>
        </div>
      </div>

      <div className={s.infoWrapper}>
        <div className={s.namePositionedWrapper}>
          <p className={s.accent}>Nanny</p>
          <h2 className={s.nameTitle}>Anna Shevchenko</h2>
        </div>

        <div className={s.detailsWrapper}>
          {keys.map((key, index) => {
            let value = detailsBlocks[key];

            if (key === 'Characters') {
              const formattedArr = detailsBlocks[key]
                .map((word) => word.charAt(0).toUpperCase() + word?.slice(1))
                .join(', ');
              value = formattedArr;
            }
            return (
              <div className={s.detailBox} key={index}>
                <p className={key === 'Age' && s.accentBorderText}>
                  <span className={s.accent}>{key}: </span> {value}
                </p>
              </div>
            );
          })}
        </div>

        <p className={s.aboutText}>
          I love children and have been working with them for over 5 years. I
          believe in creating a positive and nurturing environment for kids. I
          also love outdoor activities and crafts.
        </p>
      </div>
    </div>
  );
};

export default NannyCard;
