export const sortNannies = (filter, nannies) => {
  let newArr = [];
  switch (filter) {
    case 'all':
      newArr = nannies;
      break;
    case 'popular':
      newArr = nannies.sort((a, b) => b.rating - a.rating);
      break;
    case 'not-popular':
      newArr = nannies.sort((a, b) => a.rating - b.rating);
      break;
    case 'a-to-z':
      newArr = nannies.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'z-to-a':
      newArr = nannies.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'less-than-10':
      newArr = nannies.sort((a, b) => b.price_per_hour - a.price_per_hour);
      break;
    case 'greater-than-10':
      newArr = nannies.sort((a, b) => a.price_per_hour - b.price_per_hour);
      break;
    default:
      newArr = nannies.sort((a, b) => a.name.localeCompare(b.name));
  }

  return newArr;
};
