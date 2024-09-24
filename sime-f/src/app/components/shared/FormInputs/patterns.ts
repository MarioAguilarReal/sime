export const MASKS = {
  USPhoneMask : '(664) 444-4444',
  globalPhoneMask : '+9 (999) 999-9999',

  zipCodeMask : '99999',

  ssnMask : '999-99-9999',
};

export const PATTERNS = {
  USPhoneRegEx : /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  globalPhoneRegEx : /^^[0-9\\ -\\ \\s]+$/,

  zipCodeRegEx : /(^\d{5}$)|(^\d{5}-\d{4}$)/,

  ssnRegEx : /^\d{3}-\d{2}-\d{4}$/,

  emailRegEx: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};
