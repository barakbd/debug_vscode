//https://github.com/Microsoft/TypeScript-Node-Starter
//keep app a seperate file - for Mocha testing
import { app } from "./app";
const port: any = process.env.DOCKER_TS_DEBUG_NODE_PORT || 3000;
console.log("process.env.NODE_ENV=", process.env.NODE_ENV);

app.listen(port, (err: any) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`-------- server is listening on port ${port}`);
});
