import { useEffect } from "react";
import Router from "next/router";
import setRequest from "../../hooks/set-request";

export default () => {
  const { doRequest } = setRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};
