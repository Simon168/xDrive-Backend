import jwt from 'jsonwebtoken';
import { refreshTokens } from '../components/authAndTokens';

const SECRET = process.env.SECRET;
const SECRET_REFRESH = process.env.SECRET_REFRESH;

export const userAuth = async (req, res, next) => {
  let token;
  if(!req.cookies || !req.cookies.token){
    return next();
  }

  token = req.cookies.token;

  try{
    const {user} = jwt.verify(token, SECRET);
    req.user = user;

  }catch(ex){
    const refreshToken = req.cookies['refresh-token'];
    if(!refreshToken){
      return next();
    }
    // generate new token and refreshToken;
    const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET_REFRESH);
    // response with new token and refreshToken; store tokens in cookie rather than in localstorage;
    if(newTokens.token && newTokens.refreshToken){
      res.cookie('token', newTokens.token, {maxAge: 60 * 60 * 24 * 7, httpOnly: true});
      res.cookie('refresh-token', newTokens.refreshToken, {maxAge: 60 * 60 * 24 * 7, httpOnly: true});
    }
    req.user = newTokens.user;
  }

  return next();
}
