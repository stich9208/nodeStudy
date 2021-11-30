import path from "path";

export const trending = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/main.html"));
};

export const search = (req, res) => {
  res.send("<h1>SEARCH!</h1>");
};

export const upload = (req, res) => {
  res.send("<h1>UPLOAD VIDEO!</h1>");
};

export const detailVideo = (req, res) => {
  res.send(`<h1>DETAIL VIDEO ID:${req.params.id}!</h1>`);
};
export const editVideo = (req, res) => {
  res.send(`<h1>EDIT VIDEO ID:${req.params.id}!</h1>`);
};

export const deleteVideo = (req, res) => {
  res.send(`<h1>DELETE VIDEO! ID:${req.params.id}</h1>`);
};
