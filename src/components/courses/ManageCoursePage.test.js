import React from "react";
import ManageCoursePage from "./ManageCoursePage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/configureStore";
import { BrowserRouter } from "react-router-dom";
import { courses, authors } from "../../../tools/mockData";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

beforeEach(() => {
  fetch.resetMocks();
});

it("should display Add Course header", async () => {
  fetch.mockResponseOnce(JSON.stringify(courses));
  fetch.mockResponseOnce(JSON.stringify(authors));
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ManageCoursePage />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeTruthy();
  });

  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  screen.getByText("Title is required");
  screen.debug();
});
