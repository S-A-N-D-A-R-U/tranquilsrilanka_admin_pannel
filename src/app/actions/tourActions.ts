"use server";
import { revalidatePath } from "next/cache";
import { revalidateSite } from "@/lib/revalidateSite";
import connectToDatabase from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function getTours() {
  try {
    await connectToDatabase();
    const tours = await Tour.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(tours));
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
  }
}

export async function getTour(id: string) {
  try {
    await connectToDatabase();
    const tour = await Tour.findById(id).lean();
    return tour ? JSON.parse(JSON.stringify(tour)) : null;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

export async function deleteTour(id: string) {
  await connectToDatabase();
  await Tour.findByIdAndDelete(id);
  revalidatePath("/tours");
  await revalidateSite(["tours"]);
}

export async function saveTour(data: any, id?: string) {
  await connectToDatabase();
  if (id) {
    await Tour.findByIdAndUpdate(id, data);
  } else {
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    const newTour = new Tour(data);
    await newTour.save();
  }
  revalidatePath("/tours");
  await revalidateSite(["tours"]);
}
