import { UserService } from '../services';
import fetch from 'node-fetch';

const getGithubLogin = async (req, res, next) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const isDeployed = process.env.NODE_ENV === 'production';
  const config = {
    client_id: isDeployed
      ? process.env.GH_CLIENTID_PROD
      : process.env.GH_CLIENTID_DEV,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config).toString();
  res.redirect(`${baseUrl}?${params}`);
};

const postLogin = async (req, res, next) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const { code } = req.query;
  const isDeployed = process.env.NODE_ENV === 'production';
  const config = {
    client_id: isDeployed
      ? process.env.GH_CLIENTID_PROD
      : process.env.GH_CLIENTID_DEV,
    client_secret: isDeployed
      ? process.env.GH_SECRET_PROD
      : process.env.GH_SECRET_DEV,
    code,
  };
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;
  const token = await (
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  if (!token.access_token) return res.redirect('/');
  const accessTokenUrl = 'https://api.github.com';
  let user = await (
    await fetch(`${accessTokenUrl}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
  ).json();
  const emails = await (
    await fetch(`${accessTokenUrl}/user/emails`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
  ).json();
  const emailObj = emails.find((email) => email.primary && email.verified);
  if (!emailObj) {
    return res.redirect('/');
  }
  const foundUser = await UserService.findUserByEmail({
    email: emailObj.email,
  });
  if (!foundUser) {
    user = await UserService.createUser({
      name: user.name,
      email: emailObj.email,
    });
    req.session.loggedIn = true;
    req.session.user = user;
  } else {
    req.session.loggedIn = true;
    req.session.user = foundUser;
  }
  res.redirect('/');
};

const getLogout = async (req, res, next) => {
  delete req.session.loggedIn;
  delete req.session.user;
  req.flash('success', '로그아웃이 완료되었습니다 :)');
  return res.redirect('/posts');
};

export { getGithubLogin, postLogin, getLogout };
