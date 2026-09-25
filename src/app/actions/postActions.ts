'use server';
import { requireAdmin } from '@/lib/auth';

import { revalidatePath } from 'next/cache';
import { revalidateSite } from '@/lib/revalidateSite';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function getPosts() {
  await requireAdmin();
  await dbConnect();
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(id: string) {
  await requireAdmin();
  await dbConnect();
  try {
    const post = await Post.findById(id);
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function createPost(data: any) {
  await requireAdmin();
  await dbConnect();
  try {
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    const post = await Post.create(data);
    revalidatePath('/posts');
    await revalidateSite(['posts']);
    return { success: true, post: JSON.parse(JSON.stringify(post)) };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message };
  }
}

export async function updatePost(id: string, data: any) {
  await requireAdmin();
  await dbConnect();
  try {
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/posts');
    await revalidateSite(['posts']);
    return { success: true, post: JSON.parse(JSON.stringify(post)) };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return { success: false, error: error.message };
  }
}

export async function deletePost(id: string) {
  await requireAdmin();
  await dbConnect();
  try {
    await Post.findByIdAndDelete(id);
    revalidatePath('/posts');
    await revalidateSite(['posts']);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return { success: false, error: error.message };
  }
}
