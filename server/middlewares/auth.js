export const auth = (req, res, next) => {
  const { token, refreshToken } = req.cookies.webToken;
  console.log(token, refreshToken);
  next();
};
