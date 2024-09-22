import ingredientResponse from './ingredients.json';
import userAuthResponse from './user.json';
import feedsResponse from './feeds.json';
import orderByNumResponse from './feeds.json';
import userResponse from './userResponse.json';
import makeOrderResponse from './makeOrderResponse.json';

const testUrl = 'http://localhost:4000';
const modalSelector = '[data-cy="modal"]';
const modalsSelector = '#modals';
const mangoliaIngSelector = "[data-cy='Биокотлета из марсианской Магнолии']";
const crispyMineralSelector = `[data-cy='Хрустящие минеральные кольца']`;
const cratorBunSelector = `[data-cy='Краторная булка N-200i']`;
const modalCloseBtnSelector = '[data-cy="modal-close-btn"]';

beforeEach(() => {
  cy.intercept(`api/ingredients`, ingredientResponse);
  cy.intercept(`api/orders/all`, feedsResponse);
  cy.intercept('POST', `api/auth/login`, userAuthResponse);
  cy.intercept(`api/auth/user`, userResponse);
  cy.intercept(`api/orders/6734`, orderByNumResponse);
  cy.intercept('POST', `api/orders`, makeOrderResponse).as('makeOrder');
  cy.setCookie(
    'accessToken',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWU3ODgxOGE0YjYyMDAxYzgzNzEzYiIsImlhdCI6MTcyNjM0NDY4OCwiZXhwIjoxNzI2MzQ1ODg4fQ.-bHdcOkA7vjDwlcudRofFk5aD86VCcwmwbfTU3yWHYU'
  );
  localStorage.setItem(
    'refreshToken',
    '7a513b548c5919b3f23ca197b78f249b6a3bc06222b1efe5f76358d9334c0c5107fd8dd764cd841d'
  );
  cy.visit(testUrl);
  cy.get(`[data-cy='burger-constructor']`).as('burgerConstructor');
});

describe('проверяем доступность приложения и конструктора', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(testUrl);
  });

  it('добавление ингредиента в конструктор', () => {
    cy.get(`@burgerConstructor`).should(
      'not.contain.text',
      'Биокотлета из марсианской Магнолии'
    );

    cy.get(mangoliaIngSelector).find('button').click();

    cy.get(`@burgerConstructor`).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('добавление нескольких ингредиентов в конструктор', () => {
    cy.get(`@burgerConstructor`).should('exist');

    cy.get(`@burgerConstructor`).should(
      'not.contain.text',
      'Биокотлета из марсианской Магнолии'
    );

    cy.get(`@burgerConstructor`).should(
      'not.contain.text',
      'Краторная булка N-200i'
    );

    cy.get(`@burgerConstructor`).should(
      'not.contain.text',
      'Хрустящие минеральные кольца'
    );

    cy.get(mangoliaIngSelector).find('button').click();

    cy.get(crispyMineralSelector).find('button').click();

    cy.get(cratorBunSelector).find('button').click();

    cy.get(`@burgerConstructor`).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(`@burgerConstructor`).should(
      'contain.text',
      'Краторная булка N-200i'
    );
    cy.get(`@burgerConstructor`).should(
      'contain.text',
      'Хрустящие минеральные кольца'
    );
  });
});

describe('проверяем работу модальных окон', function () {
  it('открытие и закрытие модального окна ингридиента', () => {
    cy.get(modalsSelector).should('be.empty');
    cy.get(mangoliaIngSelector).click();
    cy.get(modalSelector).should('be.visible');
    cy.get(modalsSelector).should('not.be.empty');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(modalsSelector).should('be.empty');
    cy.get(modalSelector).should('not.exist');

    cy.get(mangoliaIngSelector).click();

    cy.get(modalCloseBtnSelector).click();
    cy.get(modalsSelector).should('be.empty');
    cy.get(modalSelector).should('not.exist');
  });
});

describe('проверяем работу создание заказа', function () {
  it('открытие и закрытие модального окна ингридиента', () => {
    cy.get(mangoliaIngSelector).find('button').click();
    cy.get(crispyMineralSelector).find('button').click();
    cy.get(cratorBunSelector).find('button').click();

    cy.get('[data-cy="order-btn"]').click();
    cy.wait('@makeOrder').then((interception) => {
      expect(interception.response?.body.order.number).equal(6734);
    });

    cy.get(modalSelector).should('be.visible');
    cy.get(modalsSelector).should('not.be.empty');
    cy.get(modalSelector).should('contain.text', '6734');

    cy.get(modalCloseBtnSelector).click();
    cy.get(modalsSelector).should('be.empty');
    cy.get(modalSelector).should('not.exist');

    cy.get(`@burgerConstructor`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');
  });
});
