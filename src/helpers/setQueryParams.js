export const setQueryParams = (filter, limit, lastValue) => {
  let queryParams = '';
  //if lastValue ?

  switch (filter) {
    case 'all':
      queryParams = `orderBy="id"&limitToFirst=${limit}&startAfter=${lastValue}`; //id ?
      break;
    case 'a-to-z':
      if (!lastValue) {
        queryParams = `orderBy="name"&limitToFirst=${limit}&startAfter=${lastValue}`;
        break;
      }
      queryParams = `orderBy="name"&limitToFirst=${limit}&startAfter="${lastValue}"`;
      break;
    case 'z-to-a':
      if (!lastValue) {
        queryParams = `orderBy="name"&limitToLast=${limit}`; //&endBefore=${lastValue}
        break;
      }
      queryParams = `orderBy="name"&limitToLast=${limit}&endBefore="${lastValue}"`;
      break;

    case 'popular':
      if (!lastValue) {
        queryParams = `orderBy="rating"&limitToLast=${limit}`;
        break;
      }
      queryParams = `orderBy="rating"&limitToLast=${limit}&endBefore=${lastValue}`; ////&endBefore=${lastValue}
      break;
    case 'not-popular':
      queryParams = `orderBy="rating"&limitToFirst=${limit}&startAfter=${lastValue}`;

    case 'less-than-10': //9, 8..  //а 10 куди?
      queryParams = `orderBy="price_per_hour"&limitToLast=${limit}&endBefore=${10}`;
      break;
    case 'greater-than-10': //11 12..
      queryParams = `orderBy="price_per_hour"&limitToFirst=${limit}&startAfter=${10}`;
      break;
    default:
      queryParams = `orderBy="id"&limitToFirst=${limit}&startAfter=${lastValue}`;
  }
  return queryParams;
};
