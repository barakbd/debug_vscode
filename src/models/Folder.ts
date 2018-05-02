// import * as mongoose from 'mongoose';
import { mongooseConnection } from "../config/mongoose_connection";

import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

export class Folder extends Typegoose {
  @prop({ required: true, unique: true })
  folder_name: string;
} //end class Folder

const FolderModel: ModelType<Folder> = new Folder().getModelForClass(Folder, {
  existingConnection: mongooseConnection
});

export { FolderModel };
