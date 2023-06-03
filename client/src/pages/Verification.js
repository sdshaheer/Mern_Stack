export const verifyName = (name) => {
    if (name.trim().length === 0) {
      return "please enter valid userName";
    }
    return null;
  };
  
  export const verifyEmail = (email) => {
    if (email.trim().length === 0) {
      return "please enter vaild Email Id";
    }
    return null;
  };
  
  export const verifyPassword = (password) => {
    if (password.trim().length === 0) {
      return "password can't be empty";
    }
    return null;
  };
  