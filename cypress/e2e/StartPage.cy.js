describe('Start Page', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('should display the SportTrack logo and welcome message', () => {
    cy.get('[data-cy=image]').should('be.visible');
    cy.get('[data-cy=text]').should('contain', 'SportTrack');
    cy.get('[data-cy=text]').should('contain', 'Добро пожаловать в SportTrack - незаменимый помощник для отслеживания питания и тренировок');
  });

  it('should navigate to the login page when "Начать" button is clicked', () => {
    cy.get('[data-cy=start]').click();
    cy.url().should('include', '/login');
  });
});
