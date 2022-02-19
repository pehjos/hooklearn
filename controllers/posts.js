import Post from "../model/Post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
	const posts = await Post.find();
	if (!posts) {
		return res.status(204).json({ message: "No posts found" });
	}
	res.json(posts);
};

export const getPost = async (req, res) => {
	const postId = req?.params?.id;
	if (!postId) {
		return res.status(400).json({ message: "Post ID is required." });
	}
	const post = await Post.findOne({ _id: postId }).exec();
	if (!post) {
		return res.status(400).json({ message: `Post ID ${postId} not found` });
	}
	res.json(post);
};

export const createPost = async (req, res) => {
	const post = req.body;
	try {
		const result = await Post.create(post);
		res.status(201).json(result);
	} catch (err) {
		console.error(err);
	}
};


export const updatePost = async (req, res) => {
	const { id } = req.params;
	const postBody = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: `Post ID ${id} not found` });
		
		const post = await Post.findOne({ _id: id }).exec();
	
	if (post) post = postBody;

	const updatedPost = await post.save();
	
	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	console.log("Eko o");

	const post = await Post.findOne({ _id: id }).exec();
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).send({ message: `Post ID ${id} not found` });

	await post.deleteOne({ _id: id });
	res.json({ message: "post deleted successfully" });
};