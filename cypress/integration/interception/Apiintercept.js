/// <reference types="cypress"/>
describe("intercept with  cypress example", () => {
  it("test api with simple intercept", () => {
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.intercept({
      path: "/posts",
    }).as("posts");
    cy.get("table:nth-of-type(1) a[href='/posts']").click();
    cy.wait("@posts").then((inter) => {
      cy.log(JSON.stringify(inter));
      console.log(inter);
    });
  });
});
