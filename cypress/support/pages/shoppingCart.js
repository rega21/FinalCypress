export class ShoppingCart{
    constructor() {
        this.cerrarMensajeAlert = '#closeModal';
        this.goShoppingCart = '#goShoppingCart';
    };

    comprarProducto(compra){ 
    
        return cy.xpath(`//p[text()="${compra}"]//following-sibling::button`)       
    };

    clickCerraMensajeAlert(){
        return cy.get(this.cerrarMensajeAlert)
    };

    clickGoShoppingCart(){
        return cy.get(this.goShoppingCart)
    };


};




