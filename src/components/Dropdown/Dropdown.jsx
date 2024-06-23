import { useEffect, useState } from 'react';
import Select from 'react-select';

import { options } from './dropdown-options';
import { dropdownStyles } from './dropdown-styles';
import { useDispatch, useSelector } from 'react-redux';
import { resetNannies, setFilter } from '../../redux/nannies/nanniesSlice';

import { getSortedNannies } from '../../redux/nannies/nanniesOperations';
import { selectFilter } from '../../redux/nannies/nanniesSelectors';

const Dropdown = ({ isFavoritesPage }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [selectedOption, setSelectedOption] = useState(filter); //

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    dispatch(resetNannies());
    dispatch(setFilter(selectedOption?.value));

    if (!isFavoritesPage) {
      return dispatch(getSortedNannies())
        .unwrap()
        .then()
        .catch((e) => console.log(e?.message));
    }

    if (selectedOption?.value === 'all') {
      if (!isFavoritesPage) {
        // return dispatch(getSortedNannies());
        // return dispatch(getNanniesData());
      }
      // return dispatch(getFavoritesData());
    }
    if (!isFavoritesPage) {
      // return dispatch(getSortedNanniesData());
    }
    // dispatch(getSortedFavsData());
  };

  // useEffect(() => {console.log(selectedOption.value);}, [selectedOption.value]);

  const selectedLabel = options.find(
    (option) => option.value === selectedOption
  );
  const placeholder = selectedLabel?.label;

  return (
    <Select
      placeholder={placeholder}
      value={selectedOption}
      defaultValue={selectedOption}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
      styles={dropdownStyles}
    />
  );
};

export default Dropdown;
