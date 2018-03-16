// https://codingsans.com/blog/mongoose-models-using-typescript-classes
import * as mongoose from "mongoose";
var connectionOptions: mongoose.ConnectionOptions | undefined;

const uri: string = `mongodb://${process.env.OPENSHIFT_MONGODB_DB_HOST}:${
  process.env.OPENSHIFT_MONGODB_DB_PORT
}/${process.env.MONGODB_DB_NAME}`;

const mongooseConnectionOptions: mongoose.ConnectionOptions = {
  autoReconnect: true,
  reconnectTries: 3,
  keepAlive: 120,
  user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
  pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
  authSource: process.env.MONGODB_AUTH_SOURCE,
  replicaSet: process.env.MONGODB_REPLICASET
};
process.env.NODE_ENV === "local"
  ? (connectionOptions = undefined)
  : (connectionOptions = mongooseConnectionOptions);

mongoose.connect(uri, connectionOptions).then(
  () => {
    console.info("mogoose connect - success");
    // console.info(`uri - ${uri}`);
    // console.info(`connectionOptions - ${connectionOptions}`);
  },
  err => {
    console.error("mogoose connect - error - ", err);
    throw err;
  }
);

export default mongoose;
