describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/register');
    });
  
    it('should display the register form', () => {
        cy.get('form').should('exist');
        cy.get('input[name="username"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('input[name="confirmPassword"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });
  
    it('should allow user to input fields', () => {
        const username = 'testusername';
        const email = 'test@example.com';
        const password = 'password123';
        
        cy.get('input[name="username"').type(username).should('have.value', username);
        cy.get('input[name="email"]').type(email).should('have.value', email);
        cy.get('input[name="password"]').type(password).should('have.value', password);
        cy.get('input[name="confirmPassword"]').type(password).should('have.value', password);
    });

    it('should navigate to register page', () => {
        cy.contains('Войти').click();
        cy.url().should('include', '/login');
    })
  });
  