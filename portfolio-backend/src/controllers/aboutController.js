import About from "../models/About.js";

// About is a SINGLE document. We use findOne / findOneAndUpdate.
export async function getAbout(req, res) {
  let doc = await About.findOne();
  if (!doc) {
    // return an empty shell so the frontend never crashes
    doc = await About.create({
      headline: "Hello, I'm Denis Wilson",
      bio: "Cybersecurity & full-stack engineer based in Nairobi, Kenya.",
      location: "Nairobi, Kenya",
    });
  }
  res.json(doc);
}

export async function updateAbout(req, res) {
  let doc = await About.findOne();
  if (!doc) {
    doc = await About.create(req.body);
  } else {
    doc = await About.findByIdAndUpdate(doc._id, req.body, {
      new: true,
      runValidators: true,
    });
  }
  res.json(doc);
}