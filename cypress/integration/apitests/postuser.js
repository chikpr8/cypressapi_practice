/// <reference types ="cypress"/>
const datajson = require("../../fixtures/createuser");
describe("posetuser", () => {
  let accesstoken =
    "3af6f2238beb3cbda50eb77c03eb438ebca34da498eba705778373252fc2519b";
  let randomtext = "";
  let testemail = "";
  it("post", () => {
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      randomtext += pattern.charAt(Math.floor(Math.random() * pattern.length));
    testemail = randomtext + "@gmail.com";

    cy.request({
      method: "post",
      url: "https://gorest.co.in/public/v1/users",
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
      body: {
        name: datajson.name,
        gender: datajson.gender,
        email: testemail,
        status: datajson.status,
      },
    })
      .then((res) => {
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(201);
        expect(res.body.data).has.property("email", testemail);
        expect(res.body.data).has.property("name", datajson.name);
        expect(res.body.data).has.property("status", datajson.status);
        expect(res.body.data).has.property("gender", datajson.gender);
      })
      .then((res) => {
        const userid = res.body.data.id;
        cy.log("user id is:" + userid);
        //2.get user (GET)
        cy.request({
          method: "get",
          url: "https://gorest.co.in/public/v1/users/" + userid,
          headers: {
            Authorization: "Bearer" + accesstoken,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data).has.property("id", userid);
          expect(res.body.data).has.property("name", datajson.name);
          expect(res.body.data).has.property("status", datajson.status);
        });
      });
  });
});
