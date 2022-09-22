const User = require("../models/User");
const fetch = require("node-fetch");

module.exports.getLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENTID,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  res.redirect(`${baseUrl}?${params}`);
};

module.exports.postLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const { code } = req.query;
  const config = {
    client_id: process.env.GH_CLIENTID,
    client_secret: process.env.GH_SECRET,
    code,
  };
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;
  const token = await (
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if (!token.access_token) return res.redirect("/");
  const accessTokenUrl = "https://api.github.com";
  let user = await (
    await fetch(`${accessTokenUrl}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
  ).json();
  const emails = await (
    await fetch(`${accessTokenUrl}/user/emails`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
  ).json();
  const emailObj = emails.find((email) => email.primary && email.verified);
  if (!emailObj) {
    return res.redirect("/");
  }
  const foundUser = await User.findOne({ email: emailObj.email });
  if (!foundUser) {
    user = await User.create({
      name: user.name,
      email: emailObj.email,
    });
    req.session.loggedIn = true;
    req.session.user = user;
  } else {
    req.session.loggedIn = true;
    req.session.user = foundUser;
  }
  res.redirect("/");
};

module.exports.getLogout = (req, res) => {
  delete req.session.isLoggedIn;
  delete req.session.user;
  req.flash("success", "로그아웃이 완료되었습니다 :)");
  return res.redirect("/");
};
