// import React from "react";
// import { render, waitFor, fireEvent } from "@testing-library/react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { BrowserRouter as Router } from "react-router-dom";
// import ProfileData from "../ProfileData";

// const server = setupServer(
//   rest.get("http://localhost:3001/api/users/user/data", (req, res, ctx) => {
//     return res(ctx.json({ information: { username: "MockUserName" } }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe("ProfileData component", () => {
//   it("renders ProfileShow when editPage is 0", async () => {
//     const { getByText } = render(
//       <Router>
//         <ProfileData userId="testUserId" />
//       </Router>
//     );

//     // Adjust the assertion based on your actual data
//     await waitFor(() => expect(getByText("MockUserName")).toBeInTheDocument());
//   });

//   it("renders ProfileEdit when editPage is 1", async () => {
//     const { getByText } = render(
//       <Router>
//         <ProfileData userId="testUserId" />
//       </Router>
//     );

//     fireEvent.click(getByText("Edit Profile"));
//     await waitFor(() => expect(getByText("Save Changes")).toBeInTheDocument());
//   });

//   it("navigates to home page when the back button is clicked", () => {
//     const { getByText, history } = render(
//       <Router>
//         <ProfileData userId="testUserId" />
//       </Router>
//     );

//     fireEvent.click(getByText("Back"));
//     expect(history.location.pathname).toBe("/home");
//     expect(history.location.state.userId).toBe("testUserId");
//   });

//   // Add more tests for error cases, loading state, etc.
// });
