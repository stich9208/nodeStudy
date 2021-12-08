import User from "../models/User";

export const home = (req, res) => {
  res.send("<h1>HOME!</h1>");
};

export const join = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    await User.create({
      email,
      username,
      password,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "can`t create user" });
  }
  return res.status(200).send({ message: "success" });
};

export const detail = (req, res) => {
  res.send(`<h1>USER DETAIL! ID:${req.params.id}</h1>`);
};
export const login = (req, res) => {
  res.send("<h1>LOGIN!</h1>");
};

export const edit = (req, res) => {
  res.send("<h1>PROFILE EDIT!</h1>");
};

export const logout = (req, res) => {
  res.send("<h1>LOGOUT!</h1>");
};

export const remove = (req, res) => {
  res.send("<h1>REMOVE USER!</h1>");
};
