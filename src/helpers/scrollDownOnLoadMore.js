export const scrollDownOnLoadMore = (ref) => {
  const itemHeight =
    ref.current.firstElementChild.getBoundingClientRect().height;
  const topHeight = ref.current.firstElementChild.getBoundingClientRect().top;
  const itemsPerCollumn = window.innerHeight / itemHeight;
  window.scrollTo({
    top: itemHeight * itemsPerCollumn - 80 - topHeight, //..
    behavior: 'smooth',
  });
};

//advertsListRef
