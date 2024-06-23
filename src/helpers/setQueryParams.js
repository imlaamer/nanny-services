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
      break;

    case 'less-than-10': //9, 8..
      if (!lastValue) {
        // queryParams = `orderBy="price_per_hour"&limitToFirst=${limit}&startAt=0`;
        queryParams = `orderBy="price_per_hour"&limitToLast=${limit}&endBefore=${10}`;
        break;
      }
      queryParams = `orderBy="price_per_hour"&limitToLast=${limit}&endBefore=${lastValue}`;
      // queryParams = `orderBy="price_per_hour"&limitToFirst=${limit}&startAfter=${lastValue}`;
      break;

    case 'greater-than-10': //10, 11 12..
      if (!lastValue) {
        // queryParams = `orderBy="price_per_hour"&limitToLast=${limit}&endAt=${10}`;
        queryParams = `orderBy="price_per_hour"&limitToFirst=${limit}&startAt=${10}`;
        break;
      }
      queryParams = `orderBy="price_per_hour"&limitToFirst=${limit}&startAfter=${lastValue}`;
      // queryParams = `orderBy="price_per_hour"&limitToLast=${limit}&endBefore=${lastValue}`;
      break;
    default:
      queryParams = `orderBy="id"&limitToFirst=${limit}&startAfter=${lastValue}`;
  }
  return queryParams;
};
