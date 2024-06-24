import { useState } from 'react';
import Select from 'react-select';
import { options } from './dropdown-options';
import { dropdownStyles } from './dropdown-styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetNannies,
  setFavsFilter,
  setFilter,
  sortFavorites,
} from '../../redux/nannies/nanniesSlice';
import { getSortedNannies } from '../../redux/nannies/nanniesOperations';
import {
  selectFavsFilter,
  selectFilter,
} from '../../redux/nannies/nanniesSelectors';

const Dropdown = ({ isFavoritesPage = false }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const favsFilter = useSelector(selectFavsFilter);

  const defaultOption = !isFavoritesPage ? filter : favsFilter;
  const [selectedOption, setSelectedOption] = useState(defaultOption); 

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    dispatch(resetNannies());
    if (!isFavoritesPage) {
      dispatch(setFilter(selectedOption?.value));
      dispatch(getSortedNannies());
      return;
    }
    dispatch(setFavsFilter(selectedOption?.value));
    dispatch(sortFavorites());
  };

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
