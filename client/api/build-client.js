import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //Runs in Server
    console.log("Runs from server.........");
    return axios.create({
      baseURL: "http://nginx-ingress-controller.kube-system",
      headers: req.headers,
    });
  } else {
    //Runs in browser
    console.log("Runs from client.........");
    return axios.create({
      baseURL: "/",
    });
  }
};
