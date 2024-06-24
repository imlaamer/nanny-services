export const USER_NAME_REGEX =
  /^[a-zA-Zа-яА-ЯА-ЩЬьЮюЯяЇїІіЄєҐґ0-9]+([- ][a-zA-Zа-яА-ЯА-ЩЬьЮюЯяЇїІіЄєҐґ0-9]+)*$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\w\d]{8,64}$/;

export const TEL_REGEX = /^\+\d{12}$/;

export const AGE_REGEX = /^[\d\sа-яА-ЯіІїЇєЄґҐa-zA-Z.,\/]+$/;

export const ADDRESS_REGEX = /^[А-ЯІЇЄҐа-яіїєґA-Za-z0-9\s,'\/-]+$/;

export const TIME_REGEX = /^(?!00:00$)([01]?[0-9]|2[0-3]):[0-5][0-9]$/;