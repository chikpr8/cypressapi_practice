/// <reference types="cypress"/>

describe("post api", () => {
  let randomtest = "";
  let testemail = "";
  it("post call", () => {
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      randomtest += pattern.charAt(Math.floor(Math.random() * pattern.length));
    testemail = randomtest + "@gmail.com";
    cy.request({
      method: "post",
      url: "https://gorest.co.in/public/v1/users",
      headers: {
        Authorization:
          "Bearer 3af6f2238beb3cbda50eb77c03eb438ebca34da498eba705778373252fc2519b",
      },
      body: {
        name: "praveen",
        status: "active",
        gender: "male",
        email: testemail,
      },
    })
      .then((resp) => {
        cy.log(JSON.stringify(resp));

        expect(resp.status).to.eq(201);
        expect(resp.body.data).has.property("email", testemail);
        expect(resp.body.data).has.property("gender", "male");
      })
      .then((resp) => {
        const userid = resp.body.data.id;
        cy.log("user id is:" + userid);
        cy.request({
          method: "put",
          url: "https://gorest.co.in/public/v1/users/" + userid,
          headers: {
            Authorization:
              "Bearer 3af6f2238beb3cbda50eb77c03eb438ebca34da498eba705778373252fc2519b",
          },
          body: {
            name: "praveenjairaj",
            // email: "praveenjairaj@gmail.com",
            status: "active",
          },
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.data).has.property("id", userid);
          expect(resp.body.data).has.property("name", "praveenjairaj");
          expect(resp.body.data).has.property("status", "active");
        });
      });
  });
});
