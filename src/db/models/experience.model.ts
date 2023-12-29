import mongoose from "mongoose";

export interface ExperienceInterface {
  title: string;
  location: string;
  description: string;
  buttonText: string;
  date: string;
  icon: string;
  tech: string;
}

const experienceSchema = new mongoose.Schema<ExperienceInterface>(
  {
    title: String,
    location: String,
    description: String,
    buttonText: String,
    date: String,
    icon: String,
    tech: String,
  },
  { timestamps: true }
);

export const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
