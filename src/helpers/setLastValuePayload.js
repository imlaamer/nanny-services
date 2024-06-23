export const setLastValuePayload = (filter) => {
  let property = '';
  switch (filter) {
    case 'all':
      property = 'id';
      break;
    case 'popular':
    case 'not-popular':
      property = 'rating';
      break;
    case 'a-to-z':
    case 'z-to-a':
      property = 'name';
      break;
    case 'less-than-10':
    case 'greater-than-10':
      property = 'price_per_hour';
      break;
    default:
      property = 'id';
  }
  return property;
};
