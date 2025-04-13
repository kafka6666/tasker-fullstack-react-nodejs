import mongoose, { Schema, Document } from "mongoose";

interface IProjectNote extends Document {
  project: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectNoteSchema = new Schema<IProjectNote>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ProjectNote = mongoose.model<IProjectNote>("ProjectNote", projectNoteSchema);

export { ProjectNote, IProjectNote };