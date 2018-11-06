const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// /vk/{id} -> UserName || ""
// https://api.vk.com/method/users.get?user_ids=508731237&access_token=a7b2f7104cbe6a9df6e1f7b63a17fe2238d40801c1ff40440744188e34d2615053bb92554febcf94a74fd&v=5.87
router.get('/*/', (req, res) => {
    const id = req.params[0];
    const token = req.query.access_token;
    const url = `https://api.vk.com/method/users.get?user_ids=${id}&access_token=${token}&v=5.87`
    fetch(url)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(e => res.send(e));
});

module.exports = router;