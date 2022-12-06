
export class Checkout {
    constructor(){
        this.firstName = '#FirstName';
        this.lastName = '#lastName';
        this.cardNumber = '#cardNumber';
    }


    clickButtonCheckout(){
        cy.xpath("//button[starts-with(text(), 'Go to Checkout')]").click()
    }

    nombre(name) {
        cy.get(this.firstName).type(name);
    };

    apellido(lastName) {
        cy.get(this.lastName).type(lastName);
    };

    tarjeta(number) {
        cy.get(this.cardNumber).type(number);
    };

    clickButtonPurchase(){
        cy.get("button").contains("Purchase").click()
    }

}


