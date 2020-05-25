import request from "supertest";
import { app } from "../../app";

it("Returns 201 for new Signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@domain.com",
      password: "safepwdasdf",
    })
    .expect(201);
});
