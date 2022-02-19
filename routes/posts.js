import express from "express";
import {
	getPosts,
	createPost,
	getPost,
	deletePost,
	updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);

router.route("/:id").delete(deletePost);
router.route("/:id").patch(updatePost);

router.route("/:id").get(getPost);

export default router;
