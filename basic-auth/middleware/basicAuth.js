function basicAuth(req, res, next) {
  // Check for basic auth header

  const auth = req.headers["authorization"];
  if (!auth || auth.indexOf("Basic") === -1) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  //   Veirfy auth credentials
  const base64String = auth.split(" ")[1];
  const credentials = Buffer.from(base64String, "base64").toString("ascii");

  const [username, password] = credentials.split(":");
  console.log(credentials, "===", base64String);

  if (username === "test" && password === "12345") {
    console.log("authenticated");
  }

  next();
}

module.exports = basicAuth;
