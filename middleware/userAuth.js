import jwt from 'jsonwebtoken';
import refreshTokens from '../components/refreshTokens';

exports.userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return next();
  }

  try{
    const {user} = jwt.verify(token, SECRET);
    req.user = user;

  }catch(err){
    const refreshToken = req.cookies['refresh-token'];
    if(!refreshToken){
      return next();
    }
    // generate new token and refreshToken;
    const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET_B);
    // response with new token and refreshToken; store tokens in cookie rather than in localstorage;
    if(newTokens.token && newTokens.refreshToken){
      res.cookie('token', newTokens.token, {maxAge: 60 * 60 * 24 * 7, httpOnly: true});
      res.cookie('refresh-token', newTokens.refreshToken, {maxAge: 60 * 60 * 24 * 7, httpOnly: true});
    }
    req.user = newTokens.user;
  }

  return next();
}
