import { useEffect, useState } from 'react';
import Select from 'react-select';

import { options } from './dropdown-options';
import { dropdownStyles } from './dropdown-styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetNannies,
  setFilter,
  updateLast,
} from '../../redux/nannies/nanniesSlice';
import {
  selectFirstValue,
  selectLastValue,
} from '../../redux/nannies/nanniesSelectors';
import {
  getNanniesData,
  getRatedNanniesData,
} from '../../redux/nannies/nanniesOperations';

const Dropdown = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const firstValue = useSelector(selectFirstValue);

  const lastValue = useSelector(selectLastValue);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    dispatch(resetNannies());

    dispatch(setFilter(selectedOption?.value));

    switch (selectedOption?.value) {
      case 'popular':
        dispatch(getRatedNanniesData());
        break;
      case 'not-popular':
        dispatch(getRatedNanniesData());
        break;
      case 'all':
        dispatch(getNanniesData(lastValue));
        break;
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <Select
      placeholder={'Show all'}
      // placeholder={'A to Z'}
      value={selectedOption}
      defaultValue={selectedOption}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
      styles={dropdownStyles}
    />
  );
};

export default Dropdown;
