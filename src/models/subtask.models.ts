import mongoose, { Schema, Document } from "mongoose";

interface ISubTask extends Document {
  title: string;
  task: mongoose.Types.ObjectId;
  isCompleted: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const subtaskSchema = new Schema<ISubTask>(
  {
    title: {
      type: String,
      required: true,
        trim: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const SubTask = mongoose.model<ISubTask>("SubTask", subtaskSchema);

export { SubTask, ISubTask };