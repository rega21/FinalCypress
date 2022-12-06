export class Recipt {

    nombreProducto(nombre) {
        return cy.xpath(`//*[@name="${nombre}"]`);
        //return cy.contains(productName)
    };

    precioProducto(precio) {
        return cy.xpath(`//*[@name="${precio}"]`);
    };

    precioTotal() {
        cy.xpath("//button[starts-with(text(), 'Show total')]").click()
    };


};