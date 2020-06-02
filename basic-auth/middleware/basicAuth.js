function basicAuth(req, res, next) {
  // Check for basic auth header

  try {
    res.set("WWW-Authenticate", "test");

    const auth = req.headers["authorization"];
    if (!auth || auth.indexOf("Basic") === -1) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    //   Veirfy auth credentials
    const base64String = auth.split(" ")[1];
    const credentials = Buffer.from(base64String, "base64").toString("ascii");

    const [username, password] = credentials.split(":");

    if (username === "test" && password === "12345") {
      req.user = { user: "test" };
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = basicAuth;
