import { useState } from 'react';
import Select from 'react-select';

import { dropdownStyles } from './dropdown-styles';
import { options } from './dropdown-options';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  //or ''?

  return (
    <Select
      // placeholder={'A to Z'}
      placeholder={'Show all'}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
      styles={dropdownStyles}
    />
  );
};

export default Dropdown;
