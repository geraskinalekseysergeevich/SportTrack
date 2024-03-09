describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
  
    it('should display the login form', () => {
      cy.get('form').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should allow user to input email and password', () => {
      const email = 'test@example.com';
      const password = 'password123';
  
      cy.get('input[name="email"]').type(email).should('have.value', email);
      cy.get('input[name="password"]').type(password).should('have.value', password);
    });
  
    it('should submit the form with valid email and password', () => {
      const email = 'againtest@mail.ru';
      const password = 'admin';
  
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/home');
    });

    it('should navigate to register page', () => {
        cy.contains('Регистрация').click();
        cy.url().should('include', '/register');
    })
  });
  