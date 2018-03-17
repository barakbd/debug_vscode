//https://github.com/Microsoft/TypeScript-Node-Starter
//keep app a seperate file - for Mocha testing
import { app } from "./app";
const port: any = process.env.PORT || 3000;

app.listen(port, (err: any) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`-------- server is listening on port ${port}`);
});
