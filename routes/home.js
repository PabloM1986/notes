/**
 * Created by pablo on 21/06/14.
 */
module.exports = function (app) {
    console.log("GET /");
    app.get("/", function(req, res) {
        res.status(200).send("hola");
    });
    console.log("GET /login");
    app.get("/login", function(req, res) {
        res.status(200).send('<form action="/login" method="POST"><input name="name" placeholder="Name"><input type="password" placeholder="password" name="password"></form>');
    });
    console.log("POST /login");
    app.post("/login", function(req, res) {
        if (req.body.name == "pablo" && req.body.password == "1234") {
            res.status(200).end();
        }
        res.status(401).send("Unauthorized");
    });
}
