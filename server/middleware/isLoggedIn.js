module.exports = function isLoggedIn(req, res, next) {
    if (validateToken(req.token)) {
      next();
    } else {
      res.send(401, "Unauthorized");
    }
};
const validateToken =(token)=>{
    // TODO add token validatation logic via api
    return true
}