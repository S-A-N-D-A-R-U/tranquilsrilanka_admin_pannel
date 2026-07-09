'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Offer from '@/models/Offer';
import Tour from '@/models/Tour';

export async function getOffers() {
  await dbConnect();
  try {
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(offers));
  } catch (error) {
    console.error('Error fetching offers:', error);
    return [];
  }
}

export async function getOffer(id: string) {
  await dbConnect();
  try {
    const offer = await Offer.findById(id);
    return JSON.parse(JSON.stringify(offer));
  } catch (error) {
    console.error('Error fetching offer:', error);
    return null;
  }
}

export async function createOffer(data: any) {
  await dbConnect();
  try {
    const offer = await Offer.create(data);
    revalidatePath('/offers');
    return { success: true, offer: JSON.parse(JSON.stringify(offer)) };
  } catch (error: any) {
    console.error('Error creating offer:', error);
    return { success: false, error: error.message };
  }
}

export async function updateOffer(id: string, data: any) {
  await dbConnect();
  try {
    const offer = await Offer.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/offers');
    return { success: true, offer: JSON.parse(JSON.stringify(offer)) };
  } catch (error: any) {
    console.error('Error updating offer:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteOffer(id: string) {
  await dbConnect();
  try {
    await Offer.findByIdAndDelete(id);
    // Remove offer reference from any tours
    await Tour.updateMany(
      { linkedOffers: id },
      { $pull: { linkedOffers: id } }
    );
    revalidatePath('/offers');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting offer:', error);
    return { success: false, error: error.message };
  }
}
