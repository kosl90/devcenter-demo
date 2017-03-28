const Router = require('express').Router;
const LoginService = require('../service/LoginService');

const router = new Router();

router.post('/', LoginService);

module.exports = router;
