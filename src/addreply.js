import { Reply } from "./db/models/reply.js";

const createReply = (keyword, reply, match, trigger) => {
	try {
		Reply.create({
			keyword,
			reply,
			match,
			trigger
		});
		return "success";
	} catch (error) {
		return "error";
	}
};

const curry = (fn) => {
	const judge = (...args) => {
		return args.length >= fn.length
			? fn(...args)
			: (...arg) => judge(...args, ...arg);
	};
	return judge;
};

export const createReplyCurry = curry(createReply);
