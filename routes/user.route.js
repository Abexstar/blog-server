const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controller/user.controller');
const authentication = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(authentication);
router.get("/profile", getUserProfile);



module.exports = router;

// const request = fetch("http://localhost:3000/api/v1/user/profile", {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         "authorization": `Bearer ${token}`
//     },
// })