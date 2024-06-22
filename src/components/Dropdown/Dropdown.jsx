import { useEffect, useState } from 'react';
import Select from 'react-select';

import { options } from './dropdown-options';
import { dropdownStyles } from './dropdown-styles';
import { useDispatch, useSelector } from 'react-redux';
import { resetNannies, setFilter } from '../../redux/nannies/nanniesSlice';

import {
  getFavoritesData,
  getNanniesData,
  getSortedFavsData,
  getSortedNanniesData,
} from '../../redux/nannies/nanniesOperations';

const Dropdown = ({ isFavoritesPage }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('a-to-z'); //

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    dispatch(resetNannies());
    dispatch(setFilter(selectedOption?.value));

    if (selectedOption?.value === 'all') {
      if (!isFavoritesPage) {
        return dispatch(getNanniesData());
      }
      return dispatch(getFavoritesData());
    }
    if (!isFavoritesPage) {
      return dispatch(getSortedNanniesData());
    }
    dispatch(getSortedFavsData());
   
  };

  // useEffect(() => {console.log(selectedOption.value);}, [selectedOption.value]);

  return (
    <Select
      placeholder={'A to Z'}
      value={selectedOption}
      defaultValue={selectedOption}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
      styles={dropdownStyles}
    />
  );
};

export default Dropdown;
