describe("Artist series example", () => {
  before(() => {
    cy.authenticate()

    const responses = new Map()
    responses.set("ListArtistSeries", {
      fixture: "artistSeries/list.json",
    })
    responses.set(/"slug":"damien-hirst-butterflies"/, {
      fixture: "artistSeries/damienHirstButterflies.json",
    })
    cy.stubMetaphysics(responses)
  })

  it("lists and shows artist series", () => {
    cy.visit("/artist-series")
    cy.contains("Butterflies").click()
    cy.url().should("include", "/artist-series/damien-hirst-butterflies")
    cy.contains("Damien Hirst: Butterflies")
  })
})
