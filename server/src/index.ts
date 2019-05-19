import("./app")
  .then(({ default: app }) => {
    app.listen(process.env.PORT);
  })
  .catch(console.error);
