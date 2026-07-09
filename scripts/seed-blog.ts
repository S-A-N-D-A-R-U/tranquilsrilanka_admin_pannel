import { connect } from "mongoose";
import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  });
}

// Define minimal schema here to bypass Next.js imports
import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  image: String,
  category: String,
  readTime: String,
  isFeatured: Boolean,
  isHtml: Boolean,
  externalLink: String,
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const dummyPosts = [
  {
    title: "10 Hidden Gems in Sri Lanka",
    slug: "hidden-gems",
    excerpt: "Discover the secret spots that most tourists miss when visiting the teardrop island.",
    content: "Sri Lanka is full of surprises. While everyone flocks to Sigiriya and Ella, there are countless hidden gems waiting to be explored. \n\n1. Ritigala: An ancient Buddhist monastery hidden in a strict nature reserve.\n2. Delft Island: See the wild ponies on this remote island off the Jaffna peninsula.\n\nAnd many more! Embark on an adventure of a lifetime.",
    image: "/img4.jpg",
    category: "Travel Guide",
    readTime: "4 min read",
    isFeatured: true,
    isHtml: false,
  },
  {
    title: "Best Time to Visit the East Coast",
    slug: "east-coast-weather",
    excerpt: "Planning a trip to Trincomalee or Arugam Bay? Here is when you should go.",
    content: `<h1>Arugam Bay Surf Season</h1>
    <p>The east coast of Sri Lanka has a completely different weather pattern compared to the west. While the west experiences its monsoon, the east shines bright.</p>
    <img src="/img5.jpg" style="border-radius:12px; margin: 20px 0;" />
    <p><strong>May to September</strong> is the absolute best time to hit the east coast. The waves in Arugam Bay are perfect, and the ocean in Trincomalee is like glass.</p>`,
    image: "/img5.jpg",
    category: "Blog",
    readTime: "3 min read",
    isFeatured: true,
    isHtml: true,
  },
  {
    title: "Sri Lankan Wildlife: A Pinterest Collection",
    slug: "wildlife-pinterest",
    excerpt: "Check out our curated Pinterest board featuring leopards, elephants, and exotic birds.",
    content: "Redirecting...",
    image: "/img6.jpg",
    category: "News",
    readTime: "1 min read",
    isFeatured: true,
    isHtml: false,
    externalLink: "https://www.pinterest.com/search/pins/?q=sri%20lanka%20wildlife"
  },
  {
    title: "Culinary Journey: The Spices of Ceylon",
    slug: "culinary-journey",
    excerpt: "A deep dive into the rich, aromatic world of traditional Sri Lankan curries.",
    content: "Sri Lankan cuisine is famous for its bold flavors and aromatic spices. The secret lies in the roasted curry powder, a blend of coriander, cumin, fennel, fenugreek, and more.\n\nFrom fiery crab curries to the comforting dhal, every dish tells a story of the island's rich heritage.",
    image: "/about.webp",
    category: "Blog",
    readTime: "5 min read",
    isFeatured: false,
    isHtml: false,
  }
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is missing");
    
    await connect(uri);
    console.log("Connected to MongoDB.");

    await Post.deleteMany({});
    console.log("Cleared old posts.");

    await Post.insertMany(dummyPosts);
    console.log("Successfully seeded dummy posts.");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
