import type { Preview } from "@storybook/react";
import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/configureStore";
import "../src/appSetup";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/", "/about"]}>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          {/* <Stories /> */}
        </>
      ),
    },
  },
};

export default preview;
