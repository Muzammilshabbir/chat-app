const { Router } = require('express')
const userRoute = require("./user.route")
const messagesRoute = require("./messages.route")

const routeSetup = (app) => {
    const router = Router();
    router.use("/user", userRoute);
    router.use("/messages", messagesRoute);

    app.use("/api/v1", router);
}

module.exports = routeSetup