const koaRouter = require("koa-router");
const rpio = require("rpio");
const bodyParser = require("koa-bodyparser");
const isEmpty = require("./utils");
const config = require("./config");
const wsEmitter = require("./wsEmitter").wsEmitter();

const router = new koaRouter();
const apiVersion = "v1";

rpio.init({mapping: "gpio"})

// setup pins
config.pinConfig.pins.map(pin => {
    rpio.open(pin.number, pin.mode);
})

router.prefix(`/api/${apiVersion}/`);

router.get("/", (ctx, next) => {
    ctx.body = "Hallo Welt";
});

router.get("/pin", async ctx => {
    ctx.body = config.pinConfig;
});

router.get("/pin/:id", async ctx => {
    try {
        ctx.body = {state: !!rpio.read(ctx.params.id)};
    } catch(err) {
        console.log(`Error Accessing Pin ${ctx.params.id}`);
    }
});

router.patch("/pin/:id", bodyParser(), async ctx => {
    try {
        if (isEmpty(ctx.request.body)) {
            ctx.status = 418;
            ctx.body = "I'm a teapot";
            return;
        }
        const pinState = ctx.request.body.state;
        rpio.write(ctx.params.id, pinState);
        ctx.body = ctx.request.body;
        const wsEmitter = require("./wsEmitter").wsEmitter();
        wsEmitter.emit("event");
    } catch(err) {
        console.log(err);
        console.log(`Error Accessing Pin ${ctx.params.id}`);
    }
})

module.exports = router;