import ingredientResponse from './ingredients.json';
import userAuthResponse from './user.json';
import feedsResponse from './feeds.json';
import orderByNumResponse from './feeds.json';
import userResponse from './userResponse.json';
import makeOrderResponse from './makeOrderResponse.json';

const URL = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
  cy.intercept(`${URL}/ingredients`, ingredientResponse);
  cy.intercept(`${URL}/orders/all`, feedsResponse);
  cy.intercept('POST', `${URL}/auth/login`, userAuthResponse);
  cy.intercept(`${URL}/auth/user`, userResponse);
  cy.intercept(`${URL}/orders/6734`, orderByNumResponse);
  cy.intercept('POST', `${URL}/orders`, makeOrderResponse);
  cy.setCookie(
    'accessToken',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWU3ODgxOGE0YjYyMDAxYzgzNzEzYiIsImlhdCI6MTcyNjM0NDY4OCwiZXhwIjoxNzI2MzQ1ODg4fQ.-bHdcOkA7vjDwlcudRofFk5aD86VCcwmwbfTU3yWHYU'
  );
  localStorage.setItem(
    'refreshToken',
    '7a513b548c5919b3f23ca197b78f249b6a3bc06222b1efe5f76358d9334c0c5107fd8dd764cd841d'
  );
  cy.visit('http://localhost:4000');
});

describe('проверяем доступность приложения и конструктора', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });

  it('добавление ингредиента в конструктор', () => {
    cy.get(`[data-cy='burger-constructor']`).should('exist');
    cy.get(`[data-cy='burger-constructor']`).should(
      'not.contain.text',
      'Биокотлета из марсианской Магнолии'
    );

    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`)
      .find('button')
      .click();

    cy.get(`[data-cy='burger-constructor']`).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('добавление нескольких ингредиентов в конструктор', () => {
    cy.get(`[data-cy='burger-constructor']`).should('exist');

    cy.get(`[data-cy='burger-constructor']`).should(
      'not.contain.text',
      'Биокотлета из марсианской Магнолии'
    );

    cy.get(`[data-cy='burger-constructor']`).should(
      'not.contain.text',
      'Краторная булка N-200i'
    );

    cy.get(`[data-cy='burger-constructor']`).should(
      'not.contain.text',
      'Хрустящие минеральные кольца'
    );

    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`)
      .find('button')
      .click();

    cy.get(`[data-cy='Хрустящие минеральные кольца']`).find('button').click();

    cy.get(`[data-cy='Краторная булка N-200i']`).find('button').click();

    cy.get(`[data-cy='burger-constructor']`).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(`[data-cy='burger-constructor']`).should(
      'contain.text',
      'Краторная булка N-200i'
    );
    cy.get(`[data-cy='burger-constructor']`).should(
      'contain.text',
      'Хрустящие минеральные кольца'
    );
  });
});

describe('проверяем работу модальных окон', function () {
  it('открытие и закрытие модального окна ингридиента', () => {
    cy.get('#modals').should('be.empty');
    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('#modals').should('not.be.empty');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('#modals').should('be.empty');
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`).click();

    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('#modals').should('be.empty');
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('проверяем работу создание заказа', function () {
  it('открытие и закрытие модального окна ингридиента', () => {
    cy.get(`[data-cy='burger-constructor']`).should('exist');

    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`)
      .find('button')
      .click();
    cy.get(`[data-cy='Хрустящие минеральные кольца']`).find('button').click();
    cy.get(`[data-cy='Краторная булка N-200i']`).find('button').click();

    cy.get('[data-cy="order-btn"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('#modals').should('not.be.empty');
    cy.get('[data-cy="modal"]').should('contain.text', '6734');

    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('#modals').should('be.empty');
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get(`[data-cy='burger-constructor']`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');
  });
});
