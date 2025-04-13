import mongoose, { Schema, Document } from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.ts";

interface IProjectMember extends Document {
  user: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  role: string;
}

const projectMemberSchema = new Schema<IProjectMember>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.MEMBER,
    },
  },
  { timestamps: true },
);

const ProjectMember = mongoose.model<IProjectMember>(
  "ProjectMember",
  projectMemberSchema,
);

export { ProjectMember, IProjectMember };