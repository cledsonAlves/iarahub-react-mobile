export const validateFields = {
    email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password: (password: string | any[]) => password.length >= 6
  };
  