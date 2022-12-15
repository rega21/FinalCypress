export class ShoppingCart{
    constructor() {
        this.precioTotal = "#price"
    };

    nombreProducto(nombreProducto){ 
         return cy.xpath(`//*[@name="${nombreProducto}"]`);      
    };

    precioProducto(precio) {
        return cy.xpath(`//*[@name="${precio}"]`);
    };


    clickButtonTotal() {
        cy.xpath('//button[text()="Show total price"]').click();
    };


    obtenerTotal(){
        return cy.get(this.precioTotal)
    }

};







