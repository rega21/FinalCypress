/// <reference types="cypress" />

import { HomePage } from '../support/pages/homePage'
import { ProductsPage } from '../support/pages/productsPage'
import { ShoppingCart } from '../support/pages/shoppingCart'
import { Checkout } from '../support/pages/checkout'
import { Recipt } from '../support/pages/recipt'


describe("Entrega final AR", () => {

    let products, validCheckout

    const homePage = new HomePage()
    const productsPage = new ProductsPage()
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
        const total = precioBlackJacket + precioRemeraNegra


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

            productsPage.comprarProducto(blackJacket).click();
            productsPage.CerraAlert()

            productsPage.comprarProducto(remeraNegra).click();
            productsPage.CerraAlert()

            productsPage.GoShoppingCart().click()

            shoppingCart.nombreProducto(blackJacket).should('have.text', blackJacket);
            shoppingCart.nombreProducto(remeraNegra).should('have.text', remeraNegra);
            shoppingCart.precioProducto(precioBlackJacket).should('contain', precioBlackJacket);
            shoppingCart.precioProducto(precioRemeraNegra).should('contain', precioRemeraNegra);

            shoppingCart.clickButtonTotal();
            shoppingCart.obtenerTotal().should('have.text',total)

            checkout.clickButtonCheckout()
            checkout.nombre(validCheckout.primerCheckout.firstName)
            checkout.apellido(validCheckout.primerCheckout.lastname)
            checkout.tarjeta(validCheckout.primerCheckout.creditCard)
            checkout.clickButtonPurchase()

            
            recipt.ReloadDesaparece().should('not.exist')
            recipt.verificarNombre().should('contain', `${validCheckout.primerCheckout.firstName}`)
            recipt.verificarNombre().should('contain', `${validCheckout.primerCheckout.lastname}`)
            recipt.verificarProducto(blackJacket).should('exist')
            recipt.verificarProducto(remeraNegra).should('exist')
            recipt.verificarTarjeta().should('have.text', validCheckout.primerCheckout.creditCard)
            recipt.verificarTotal().should('contain', total)
   

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
