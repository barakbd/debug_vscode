// import * as mongoose from 'mongoose';
import mongoose from "../config/monggose-connect";

import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

class File extends Typegoose {
  @prop({ required: true })
  file_name: string;
  
  @prop({ required: true })
  metadata: any;
} //end class File

 const FileModel: ModelType<File> = new File().getModelForClass(File, {
  existingConnection: mongoose.connection
});

export {FileModel}