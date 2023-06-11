export const userIsAdmin = (username: string): boolean => {
  const { REACT_APP_ADMIN_LIST } = process.env;
  return REACT_APP_ADMIN_LIST?.split(',').includes(username) || false;
};
