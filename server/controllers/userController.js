import User from "../models/User";

//=====join=====
export const join = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    await User.create({
      email,
      username,
      password,
    });
  } catch (err) {
    if (err.code === 11000) {
      const dupKey = Object.keys(err.keyPattern)[0];
      return res.status(404).send({
        message: "duplicated",
        dupKey,
      });
    }
    return res.status(404).send({
      message: "can`t create user",
    });
  }
  return res.status(200).send({ message: "success" });
};

//=====login=====
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "no match user" });
    }
    if (!user.comparePassword(password)) {
      res.send({ message: "please check your password!" });
    }
    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res
      .cookie("webToken", {
        token,
        refreshToken,
      })
      .status(200)
      .send({
        message: "success",
      });
  } catch (err) {
    console.log("login err", err);
    res.status(404).send({ message: "fail", err });
  }
};

export const detail = (req, res) => {
  res.send(`<h1>USER DETAIL! ID:${req.params.id}</h1>`);
};

//=====edit=====
export const edit = async (req, res) => {
  const { refreshToken } = req.cookies.webToken;
  const { email, username, _id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, { email, username });
    const token = await user.generateAccessToken();
    res
      .cookie("webToken", { token, refreshToken })
      .status(200)
      .send({ message: "success", user });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "fail", err });
  }
};

export const logout = (req, res) => {
  res.send("<h1>LOGOUT!</h1>");
};

export const remove = (req, res) => {
  res.send("<h1>REMOVE USER!</h1>");
};

export const auth = (req, res) => {
  res.send({ message: "success" });
};
