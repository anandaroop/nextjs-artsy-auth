export {} // hack: silence the --isolated-modules warning

// use in examples to intercept and record a fixture
// cy.wait('@someAlias')//.then(intercept => cy.writeFile(`${intercept.id}.json`, intercept.response.body) && console.log({ intercept }))

describe("Authentication", () => {
  let loggedIn = false

  before(() => {
    cy.intercept("/api/login", (req) => {
      console.log(req)
      if (req.body.otp) {
        loggedIn = true
        req.reply({
          statusCode: 200,
          fixture: "authentication/success.json",
        })
      } else {
        req.reply({
          statusCode: 401,
          fixture: "authentication/missingOTP.json",
        })
      }
    }).as("apiLogin")

    cy.intercept("/api/user", (req) => {
      if (loggedIn) {
        req.reply({ fixture: "authentication/currentUser.json" })
      } else {
        req.reply({ user: null })
      }
    }).as("apiUser")
  })

  it("logs in with two-factor authentication", () => {
    cy.visit("/")
    cy.contains("NextJS Artsy Auth Demo")
    cy.contains("Login").click()
    cy.url().should("include", "/login")

    // fill out login form
    cy.get("input[name=username]").type("fake.admin@artsymail.com")
    cy.get("input[name=password]").type("passw0rd")
    cy.get("button[type=submit").click()

    // respond to otp prompt
    cy.get("input[name=otp]").type("424242")
    cy.get("button[type=submit").click()

    // successfully logged in and redirected to /
    cy.contains("Logout")
    cy.location("pathname").should("equal", "/")

    // current session is found
    cy.contains("Authenticated page").click()
    cy.contains("Here's your current session info")
    cy.contains("fake.admin@artsymail.com")
  })
})
