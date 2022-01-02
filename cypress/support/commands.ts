export {}

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* MOCK AUTHENTICATION */

/** Stub a current user session so that there appears to be a logged in user. */
const authenticate = () => {
  cy.intercept("/api/user", { fixture: "authentication/currentUser.json" }).as(
    "apiUser"
  )
}

/* MOCK METAPHYSICS DATA */

/**
 * When the outgoing query or variables match this string or RegExp,
 * then the MP request will be intercepted and the corresponding
 * response will be returned instead.
 */
type ResponseMatcher = string | RegExp

/** A map of susbtrings/regexes to mock responses */
type MetaphysicsResponses = Map<ResponseMatcher, object>

/** Enable nice logging of failed stubs in Cypress test runner */
function formatError({ query, variables, matchers }) {
  return `
No matching stub found for outgoing MP query:
${query}.\n
Variables: ${variables}\n
Current matchers:\n
• ${matchers.join("\n• ")}
`
}

/** Match an outgoing Metaphysics query by substring or regex, and then stub a response for it */
function stubMetaphysics(responses: MetaphysicsResponses) {
  const v2endpoint = [Cypress.env("METAPHYSICS_URL"), "v2"].join("/")

  cy.intercept(v2endpoint, (req) => {
    const { query, variables } = req.body
    const matchers = Array.from(responses.keys())
    const match = matchers.find(
      (matcher) => query.match(matcher) || variables.match(matcher)
    )

    // console.log({ query, variables, matchers, match })

    if (match) {
      Cypress.log({
        name: "stubMetaphysics",
        displayName: "stub MP",
        message: match,
        consoleProps: () => {
          return {
            matcher: match,
            response: responses.get(match),
          }
        },
      })
      req.reply(responses.get(match))
    } else {
      req.reply({ errors: "cy.stubMetaphysics had no matches" })
      throw new Error(formatError({ query, variables, matchers }))
    }
  }).as("stubMetaphysics")
}

/** DECLARE AND ADD COMMANDS */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      authenticate: typeof authenticate
      stubMetaphysics: typeof stubMetaphysics
    }
  }
}

Cypress.Commands.add("authenticate", authenticate)
Cypress.Commands.add("stubMetaphysics", stubMetaphysics)
