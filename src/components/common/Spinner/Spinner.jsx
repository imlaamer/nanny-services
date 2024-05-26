import { ThreeDots } from 'react-loader-spinner';

const Spinner = ({ color = '#fff', width = 40, height = 30 }) => {
  return (
    <ThreeDots
      visible={true}
      height={height}
      width={width}
      color={color}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
