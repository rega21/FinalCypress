export class HomePage{
    constructor() {
        this.onlineShopLink = '#onlineshoplink';
    };

    clickonlineShopLink(){
        cy.get(this.onlineShopLink).click();
    };
};