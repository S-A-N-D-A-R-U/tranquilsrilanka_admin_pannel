"use server";
import { revalidatePath } from "next/cache";
import { revalidateSite } from "@/lib/revalidateSite";
import connectToDatabase from "@/lib/mongodb";
import Activity from "@/models/Activity";

export async function getActivities() {
  try {
    await connectToDatabase();
    const activities = await Activity.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(activities));
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export async function getActivity(id: string) {
  try {
    await connectToDatabase();
    const activity = await Activity.findById(id).lean();
    return activity ? JSON.parse(JSON.stringify(activity)) : null;
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
}

export async function deleteActivity(id: string) {
  await connectToDatabase();
  await Activity.findByIdAndDelete(id);
  revalidatePath("/activities");
  await revalidateSite(["activities"]);
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
  await revalidateSite(["activities"]);
}
