import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зайти на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Цвет кнопки Забыли пароль?
});

afterEach('Конец теста', function () {
    cy.get(result_page.close); // Наличие крестика и виден ли он пользователю
   });


    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login) // Ввести верный логин
         cy.get(main_page.password).type(data.password) // Ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать на кнопку Войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю успех авт. и текст после нее
         cy.get(result_page.title).should('be.visible'); // Виден ли текст
     })

     it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажать кнопку Забыли пароль?
        cy.get('#forgotForm > .header').contains('Восстановите пароль'); // Перейти на стр. ввода мейла и проверить тест 
        cy.get(recovery_page.email).type("koteika19922@yandex.ru")
        cy.get(recovery_page.send_button).click(); // Нажать на кнопку Отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю успех авт. и текст после нее
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login) // Ввести верный логин
        cy.get(main_page.password).type('Loveqastudio1') // Ввести неверный пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку Войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю успех авт. и текст после нее
    })


    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('germann@dolnikov.ru') // Ввести неверный логин
        cy.get(main_page.password).type(data.password) // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку Войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');// Проверяю успех авт. и текст после нее
    })

    it('Логин без @ , пароль верный', function () {
        cy.get(main_page.email).type('germandolnikov.ru') // Ввести логин без @
        cy.get(main_page.password).type(data.password) // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку Войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');// Проверяю успех авт. и текст после нее
    })

    it('Логин с привидением строчных букв , пароль верный', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru') // Ввести логин с приведением строчных букв
        cy.get(main_page.password).type(data.password) // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать на кнопку Войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю успех авт. и текст после нее
    })
 }) 


