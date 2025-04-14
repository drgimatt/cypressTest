describe('QA Practice Test Flow', () => {
    beforeEach(() => {
      cy.resetBrowser({ cookies: true, local: false, session: true });
      });
    it('Should successfully check - Check Me Out - 2', () => {
       cy.visit('https://qa-practice.netlify.app/checkboxes')
       //cy.contains('Check me out - 1').prev().check()
       cy.get('[type="checkbox"]').eq(0).check().should('be.checked') // If hindi checkbox ang input type hindi gagana si .check()
       cy.get('[type="checkbox"]').eq(1).uncheck().should('not.be.checked')
    });
    it('Should successfully select Radio button 1', () => {
       cy.visit('https://qa-practice.netlify.app/radiobuttons')
       cy.get('#radio-button1').click().should('be.checked')
       cy.get('#radio-button2').should('not.be.checked')
       cy.get('#radio-button3').should('not.be.checked')
    });
    it('Should successfully select ', () => {
     cy.visit('https://qa-practice.netlify.app/radiobuttons') //https://qa-practice.netlify.app/dropdowns
     cy.get('#radio-button1').click().should('be.checked')
     cy.get('#radio-button2').should('not.be.checked')
     cy.get('#radio-button3').should('not.be.checked')
  });
  it('Should successfully select Philippines', () => {
      cy.visit('https://qa-practice.netlify.app/dropdowns')
      // //select[contains(@id, 'dropdown-menu')]
      cy.xpath("//select[contains(@id, 'dropdown-menu')]").select('Philippines').should('be.visible')
      //cy.get('#dropdown-menu').select('Philippines').should('be.visible').contains('Philippines')
  });
  
  }); 
  