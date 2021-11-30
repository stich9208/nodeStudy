export const home = (req, res) => {
  res.send("<h1>HOME!</h1>");
};

export const join = (req, res) => {
  res.send("<h1>JOIN!</h1>");
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
