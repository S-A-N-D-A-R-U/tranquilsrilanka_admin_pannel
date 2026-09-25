"use server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { revalidateSite } from "@/lib/revalidateSite";
import connectToDatabase from "@/lib/mongodb";
import HeroSlide from "@/models/HeroSlide";

export async function getHeroSlides() {
  await requireAdmin();
  try {
    await connectToDatabase();
    const slides = await HeroSlide.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(slides));
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

export async function getHeroSlide(id: string) {
  await requireAdmin();
  try {
    await connectToDatabase();
    const slide = await HeroSlide.findById(id).lean();
    return slide ? JSON.parse(JSON.stringify(slide)) : null;
  } catch (error) {
    console.error("Error fetching hero slide:", error);
    return null;
  }
}

export async function deleteHeroSlide(id: string) {
  await requireAdmin();
  await connectToDatabase();
  await HeroSlide.findByIdAndDelete(id);
  revalidatePath("/hero-slides");
  await revalidateSite(["hero-slides"]);
}

export async function saveHeroSlide(data: any, id?: string) {
  await requireAdmin();
  await connectToDatabase();
  if (id) {
    await HeroSlide.findByIdAndUpdate(id, data);
  } else {
    const newSlide = new HeroSlide(data);
    await newSlide.save();
  }
  revalidatePath("/hero-slides");
  await revalidateSite(["hero-slides"]);
}
