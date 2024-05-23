export class AppValidation {
  // Regex email
  private emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Regex password
  private readonly passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  private readonly nameRegex = /^[A-Za-z ]+$/;
  constructor() {
    // console.log('App validation constructor is called');
  }
  get getEmailReg() {
    return this.emailRegex;
  }
  set setEmailReg(reg: RegExp) {
    this.emailRegex = reg;
  }
  // Validate Login
  validateLogin = (email: string): boolean => {
    if (this.emailRegex.test(email) === false) {
      return false;
    }
    return true;
  };
  validatePassword = (password: string): boolean => {
    if (this.passwordRegex.test(password) === false) {
      return false;
    }
    return true;
  };
  // validate name
  validateUserName = (name: string): boolean => {
    if (this.nameRegex.test(name) === false) {
      return false;
    }
    return true;
  };
}
