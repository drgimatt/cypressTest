class RegistrationPage {
x
  
    // Method to fill the signup form
    fillSignUpForm({
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      phoneNum,
      ssn,
      username,
      password,
    }) {
      cy.get(this.firstNameInput).type(firstName);
      cy.get(this.lastNameInput).type(lastName);
      cy.get(this.addressInput).type(address);
      cy.get(this.cityInput).type(city);
      cy.get(this.stateInput).type(state);
      cy.get(this.zipCodeInput).type(zipCode);
      cy.get(this.phoneNumberInput).type(phoneNum);
      cy.get(this.ssnInput).type(ssn);
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type(password);
      cy.get(this.confirmPasswordInput).type(password);
    }
  
    // Method to submit the signup form
    submitSignUpForm() {
      cy.get(this.registerButton).click();
    }
  
    // Method to verify successful signup
    verifySignUpSuccess(username) {
      cy.get(this.welcomeMessage).should('contain.text', `Welcome ${username}`);
    }
  }
  
  export default new RegistrationPage();