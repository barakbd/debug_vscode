// import * as mongoose from 'mongoose';
import { mongooseConnection } from "../config/mongoose_connection";

import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

export class Folder extends Typegoose {
  @prop({ required: true })
  metadata: any;
  // constructor(metadata: any) {
  //   super();
  //   this.metadata = metadata;
  // }
} //end class File

const FolderModel: ModelType<Folder> = new Folder().getModelForClass(File, {
  existingConnection: mongooseConnection
});

export { FolderModel };
