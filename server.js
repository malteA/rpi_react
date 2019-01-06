const Koa = require("koa");
const cors = require("@koa/cors");

const app = new Koa();
const router = require("./routes");

app.use(cors());
app.use(router.routes())
app.use(router.allowedMethods());

const server = app.listen(4000);
const wsEmitter = require("./wsEmitter").wsEmitter(server);


const test = require("./wsEmitter").wsEmitter();
test.emit("event");
test.emit("event");
test.emit("event");
test.emit("event");