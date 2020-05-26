import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="container">
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log(Object.keys(appContext));

  const client = buildClient(appContext.ctx);
  let response = { currentUser: null };
  try {
    response = await client.get("/api/users/me");
    console.log("RESP: ", response.data);
  } catch (err) {
    console.log("ERR: ", err);
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...response.data };
};

export default AppComponent;
