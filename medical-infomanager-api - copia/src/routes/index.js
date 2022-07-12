const {Router} = require('express');
const router = Router();

router.get('/', (req, res)=>{
    res.send("Main directory of [Medical-InfoManager-API]");
});

module.exports = router; //.