import express from "express";

const app = express();

const data = {
  name: "wiratman",
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
