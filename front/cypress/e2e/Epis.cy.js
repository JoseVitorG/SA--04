describe('Excluir EPI', () => {
    it('deve excluir o EPI', () => {
      // Visitar a página inicial
      cy.visit('http://localhost:5173/');
  
      // Acessar a página de EPIs (clicar no item correspondente)
      cy.get('#epi')
        .should('be.visible')
        .click();
  
      // Clicar no botão para cadastrar um novo EPI
      cy.get('.epi-item')
        .contains('Cadastrar EPI')
        .click();
  
      // Preencher o formulário de cadastro com valores fictícios
      cy.get('input[placeholder="Nome"]')
        .type('EPI Teste');
      cy.get('input[placeholder="Descricao"]')
        .type('Descrição do EPI de teste');
      cy.get('input[placeholder="Quantidade"]')
        .type('10');
      cy.get('input[placeholder="Foto"]')
        .type('http://url-da-foto.com');
  
      // Submeter o formulário
      cy.get('button')
        .contains('Cadastrar')
        .click();
  
      // Verificar se o EPI foi adicionado com sucesso
      cy.get('.epi-item')
        .should('contain.text', 'EPI Teste')
        .and('contain.text', '10');
  
      // Clicar no EPI adicionado para editar
      cy.get('.epi-item')
        .contains('EPI Teste')
        .click();
  
      // Alterar o nome do EPI para 'teste2'
      cy.get('input[placeholder="Nome"]')
        .clear()
        .type('teste2');
  
      // Submeter a edição
      cy.get('button')
        .contains('Editar')
        .click();
  
      // Verificar se o nome do EPI foi alterado para 'teste2'
      cy.get('.epi-item')
        .should('contain.text', 'teste2')
        .and('contain.text', '10');
  
      // Clicar no ícone de exclusão (lixeira)
      cy.get('svg[viewBox="0 0 16 16"]')
        .click();
  
      // Confirmar que o EPI foi excluído
      cy.get('.epi-item')
        .should('not.contain.text', 'teste2');
    });
  });
  