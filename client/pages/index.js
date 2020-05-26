import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("I run at client: ", currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  let response;
  const client = buildClient(context);
  try {
    response = await client.get("/api/users/me");
  } catch (err) {
    console.log("ERROR ", err);
  }
  return response?.data || { currentUser: "hi" };
};

export default LandingPage;
