const koa = require("koa");
const koaRouter = require("koa-router");
const rpio = require("rpio");

const app = new koa();
const router = new koaRouter();

// setup pins
rpio.open(7, rpio.INPUT);

router.get("/", (ctx, next) => {
    ctx.body = "rpio";
});

router.get("/pin", (ctx, next) => {
    ctx.body = "rpio";
});

router.get("/pin/:id", (ctx, next) => {
    try {
        ctx.body = `Pin ${ctx.params.id} is currently ${rpio.read(ctx.params.id) ? "high" : "low"}`;
    } catch(err) {
        console.log(`Error Accessing Pin ${ctx.params.id}`);
    }
});

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000);