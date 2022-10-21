export const emailValidator = (email: string) => {
  const regex = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'email required *';
  } else if (!regex.test(email)) {
    return 'Ooops! We need a valid email address *';
  }

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password && password.length <= 1) {
    return 'Password required *';
  } else if (password.length < 6) {
    return 'Weak password, minimum 6 characters are required *';
  }
  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) {
    return 'Please enter your name';
  } else if (name.length > 20) {
    return 'Name is too long';
  }
  return '';
};
