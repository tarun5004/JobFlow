import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["applied", "oa", "interview", "offer", "rejected"],
      default: "applied",
    },
    type: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "freelance",
      ],
      required: true,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

jobApplicationSchema.index({
  user: 1,
  status: 1,
  type: 1,
});

jobApplicationSchema.index({
  user: 1,
  appliedAt: -1,
});

const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema,
);

export default JobApplication;