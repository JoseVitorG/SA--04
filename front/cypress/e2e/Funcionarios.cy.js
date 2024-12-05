describe('Testar Funcionario - Cadastro, Edição e Exclusão', () => {
    it('Deve cadastrar, editar e excluir um funcionário', () => {
      // Passo 1: Acessar a página de funcionários
      cy.visit('http://localhost:5173/');
  
      // Acessar a página de funcionários
      cy.get('#func').click();
  
      // Clicar no botão de cadastro de funcionário
      cy.get('.funcionario-card')
        .contains('Cadastrar funcionário')
        .click();
  
      // Preencher os dados do novo funcionário
      cy.get('input[placeholder="Nome"]')
        .type('Funcionario Teste');
      cy.get('input[placeholder="Email"]')
        .type('funcionario@teste.com');
      cy.get('input[placeholder="Senha"]')
        .type('senha123');
      cy.get('input[placeholder="Cargo"]')
        .type('Assistente');
      cy.get('input[placeholder="Foto"]')
        .type('https://upload.wikimedia.org/wikipedia/pt/2/27/SpongeBob_-_Employee_of_the_Month.jpg');
  
      // Selecionar o turno
      cy.get('.p-dropdown')
        .click()
        .get('.p-dropdown-item')
        .first()
        .click();
  
      // Submeter o formulário para cadastrar o funcionário
      cy.get('button')
        .contains('Cadastrar')
        .click();
  
      // Passo 2: Verificar se o funcionário foi cadastrado
      cy.get('.funcionario-card')
        .should('contain.text', 'Funcionario Teste')
        .and('contain.text', 'Assistente');
  
      // Passo 3: Editar o nome do funcionário para "teste2"
      // Clicar no funcionário que acabamos de cadastrar para editar
      cy.get('.funcionario-card')
        .contains('Funcionario Teste')
        .click();
  
      // Alterar o nome para 'teste2'
      cy.get('input[placeholder="Nome"]')
        .clear()
        .type('teste2');
  
      // Submeter a edição
      cy.get('button')
        .contains('Editar')
        .click();
  
      // Verificar se o nome foi alterado para 'teste2'
      cy.get('.funcionario-card')
        .should('contain.text', 'teste2')
        .and('contain.text', 'Assistente');
  
      // Passo 4: Excluir o funcionário
      // Clicar no ícone de exclusão (lixeira)
      cy.get('svg[fill="currentColor"]')
        .click();
  
      // Confirmar que o funcionário foi excluído
      cy.get('.funcionario-card')
        .should('not.contain.text', 'teste2');
    });
  });
  