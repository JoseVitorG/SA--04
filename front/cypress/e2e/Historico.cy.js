describe('Acessar o Histórico', () => {
  it('deve acessar a página de histórico ao clicar no botão', () => {
      cy.visit('http://localhost:5173/'); 

      cy.get('#historico')
          .should('be.visible')
          .click();
      cy.url().should('include', '/historico'); 
  });
});
