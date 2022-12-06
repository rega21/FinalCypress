/// <reference types="cypress" />

import { HomePage } from '../support/pages/homePage'
import { ShoppingCart } from '../support/pages/shoppingCart'
import { Recipt } from '../support/pages/recipt'
import { Checkout } from '../support/pages/checkout'

describe("Entrega final AR", () => {

    let products, validCheckout

    const homePage = new HomePage()
    const shoppingCart = new ShoppingCart()
    const recipt = new Recipt()
    const checkout = new Checkout()

    const number = Math.floor(Math.random() * 1000)
    const user = `clark${number}`

    before("before", () => {

        cy.fixture('products').then(dataProducto => {
            products = dataProducto;
        });

        cy.fixture('dataCheckout').then(dataCheckout => {
            validCheckout = dataCheckout;
        });

    });

    it('Registro, Logueo y Compra', () => {

        const blackJacket = products.Producto1.name
        const remeraNegra = products.Producto2.name
        const precioBlackJacket = products.Producto1.price
        const precioRemeraNegra = products.Producto2.price


        cy.request({
            method: "POST",
            url: `https://pushing-it.onrender.com/api/register`,
            body: {
                username: user,
                password: "123456!",
                gender: "male",
                day: "10",
                month: "april",
                year: "1990",
            }
        })
        cy.request({
            method: "POST",
            url: `https://pushing-it.onrender.com/api/login`,
            body: {
                username: user,
                password: "123456!"
            }
        }).then(respuesta => {

            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.user.username)
            cy.visit('')

            homePage.clickonlineShopLink()

            cy.wait(3000)

            shoppingCart.comprarProducto(blackJacket).click();
            shoppingCart.clickCerraMensajeAlert().click()

            shoppingCart.comprarProducto(remeraNegra).click();
            shoppingCart.clickCerraMensajeAlert().click()

            shoppingCart.clickGoShoppingCart().click();

            recipt.nombreProducto(blackJacket).should('exist');
            recipt.nombreProducto(remeraNegra).should('exist');
            recipt.precioProducto(precioBlackJacket).should('exist');
            recipt.precioProducto(precioRemeraNegra).should('exist');

            recipt.precioTotal()

            checkout.clickButtonCheckout()
            checkout.nombre(validCheckout.primerCheckout.firstName)
            checkout.apellido(validCheckout.primerCheckout.lastname)
            checkout.tarjeta(validCheckout.primerCheckout.creditCard)

            checkout.clickButtonPurchase()
        })

    }); //IT


    after('Eliminar usuario', () => {
        cy.request({
            method: "DELETE",
            url: `https://pushing-it.onrender.com/api/deleteuser/${user}`,
        }).then(response => {
            expect(response.status).equal(200)
        })
    })


});
