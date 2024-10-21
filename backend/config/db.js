import mongoose from "mongoose";

export const connect = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connect db successfully");
    })
    .catch((e) => console.log(e));
};

