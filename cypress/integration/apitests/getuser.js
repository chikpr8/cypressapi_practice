/// <reference types ='cypress' />
describe("get user method", () => {
  it("get user", () => {
    cy.request({
      method: "get",
      url: "https://gorest.co.in/public/v1/users/2",
      headers: {
        Authorization:
          "Bearer 3af6f2238beb3cbda50eb77c03eb438ebca34da498eba705778373252fc2519b",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      // expect(res.body.meta.pagination.limit).to.eq(20);
      expect(res.body.data.name).to.eq("Brajendra Mahajan");
    });
  });
});
