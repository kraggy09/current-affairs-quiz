import app from "./app.js";

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hello World!",
    success: true,
  });
});

app.listen(5000, () => {
  console.log("App is running at 5000");
});
