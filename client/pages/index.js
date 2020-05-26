import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Signed in</h1> : <h1>Not Signed In</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  let data = { currentUser: null };
  try {
    data = await (await client.get("/api/users/me")).data;
  } catch (err) {
    console.log("ERROR ", err);
  }
  return data;
};

export default LandingPage;
