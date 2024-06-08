import Button from '../../uikit/Button/Button';
import NannyCard from '../NannyCard/NannyCard';

const NanniesList = ({ nannies }) => {
  return (
    <>
      {nannies.map((nanny, index) => (
        <NannyCard key={index} nanny={nanny} />
      ))}
      <Button
        className="loadMoreBtn"
        title="Load  more"
        // onClick={handleOpen}
      />
    </>
  );
};

export default NanniesList;
