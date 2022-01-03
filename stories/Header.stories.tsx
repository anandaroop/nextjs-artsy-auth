import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Nav } from "../components/Header"

export default {
  title: "Header",
} as ComponentMeta<typeof Nav>

const Template: ComponentStory<typeof Nav> = (args) => (
  <header style={{ background: "black", color: "white" }}>
    <Nav {...args} />
  </header>
)

export const LoggedOut = Template.bind({})
LoggedOut.args = {}

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: {},
}
