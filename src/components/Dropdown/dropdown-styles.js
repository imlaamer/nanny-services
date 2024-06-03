export const dropdownStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    padding: '8px 16px',
    borderRadius: 14,
    background: '#103931',
    boxShadow: 'none',
    borderColor: 'transparent',
    outline: state.isFocused && 'none',
    color: 'var(--primary-white)',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.11,
    cursor: 'pointer',

    '&:hover': {
      borderColor: 'transparent',
    },
  }),
  container: (baseStyles) => ({
    ...baseStyles,
    width: 226,
    marginBottom: 32,
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--primary-white)',
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--primary-white) ',
  }),
  indicatorContainer: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--primary-white)',
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: 'var(--primary-white)',
    // transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0)',
    // transition: 'var(--transition)',
    ':hover': {
      color: 'var(--primary-white)',
    },
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none',
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    padding: 18,
    borderRadius: 14,
    background: 'var(--primary-white)',
    boxShadow: '0px 20px 69px 0px rgba(0, 0, 0, 0.07)',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--primary-white)',
  }),
  option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
    ...baseStyles,
    color: !isSelected ? 'rgba(17, 16, 28, 0.30)' : 'var(--primary-dark)',
    fontSize: 18,
    lineHeight: 1.11,
    padding: 0,
    backgroundColor: isSelected && 'unset',
    cursor: 'pointer',
    ':hover': {
      color: 'var(--primary-dark)',
      transition: 'var(--transition)',
    },
    ':active': {
      backgroundColor: 'transparent',
    },
    ':focus-visible': {
      outline: 'none',
    },
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }),
};
