export const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const now = new Date();

  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDifference = now.getMonth() - birthDate.getMonth();
  const dayDifference = now.getDate() - birthDate.getDate();

  // Якщо поточний місяць менший за місяць народження, або якщо місяці рівні, але поточний день менший за день народження
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  return age;
};
