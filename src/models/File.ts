// import * as mongoose from 'mongoose';
import { mongooseConnection } from "../config/mongoose_connection";

import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

export class File extends Typegoose {
  @prop({ required: true })
  metadata: any;
  // constructor(metadata: any) {
  //   super();
  //   this.metadata = metadata;
  // }
} //end class File

const FileModel: ModelType<File> = new File().getModelForClass(File, {
  existingConnection: mongooseConnection
});

export { FileModel };
