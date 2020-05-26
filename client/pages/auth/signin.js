import { useState } from "react";
import Router from "next/router";
import setRequest from "../../hooks/set-request";

export default () => {
  const [email, setemail] = useState("");
  const [pwd, setPwd] = useState("");

  const { doRequest, errors } = setRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password: pwd },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>SignIn</h1>
      <div className="form-group">
        <label>Username</label>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">SignIn</button>
    </form>
  );
};
