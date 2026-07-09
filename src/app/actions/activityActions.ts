"use server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Activity from "@/models/Activity";

export async function getActivities() {
  await connectToDatabase();
  const activities = await Activity.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(activities));
}

export async function getActivity(id: string) {
  await connectToDatabase();
  const activity = await Activity.findById(id).lean();
  return JSON.parse(JSON.stringify(activity));
}

export async function deleteActivity(id: string) {
  await connectToDatabase();
  await Activity.findByIdAndDelete(id);
  revalidatePath("/activities");
}

export async function saveActivity(data: any, id?: string) {
  await connectToDatabase();
  if (id) {
    await Activity.findByIdAndUpdate(id, data);
  } else {
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    const newActivity = new Activity(data);
    await newActivity.save();
  }
  revalidatePath("/activities");
}
