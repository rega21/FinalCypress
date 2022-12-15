export class Recipt {

    constructor() {
        this.name = "#name";
        this.cardNumber = "#creditCard";
        this.totalPrice = "#totalPrice";
    }

    ReloadDesaparece() {
        return cy.get('[role="progressbar"]', { timeout: 15000 })
    }

    verificarNombre() {
        return cy.get(this.name);
    }


    verificarProducto(product) {
        return cy.xpath(`//div//p[text()="${product}"]`);
    };


    verificarTarjeta() {
        return cy.get(this.cardNumber);
    }


    verificarTotal() {
        return cy.get(this.totalPrice)
    };

};