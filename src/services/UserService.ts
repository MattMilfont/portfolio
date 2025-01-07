import { User, UserModel } from "../models/UserModel";

export const authentication = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3333/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
};
