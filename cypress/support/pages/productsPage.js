export class ProductsPage {
    constructor() {
        this.cerrarMensajeAlert = '#closeModal';
        this.goShoppingCart = '#goShoppingCart';
    };

    comprarProducto(producto) {
        return cy.xpath(`//p[text()="${producto}"]//following-sibling::button`)
    };

    CerraAlert() {
        return cy.get(this.cerrarMensajeAlert).click()
    };

    GoShoppingCart() {
        return cy.get(this.goShoppingCart)
    };


};