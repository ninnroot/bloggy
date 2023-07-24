
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    global.db.all("SELECT * FROM blog", function(err, rows) {
        if (err){
            next(err)
        } else {
            res.json(rows)
        }
    })
})

module.exports = router;
