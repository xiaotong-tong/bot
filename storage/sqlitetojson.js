import { Reply } from "../src/db/models/reply.js";
import fs from "fs";

const allMsg = await Reply.findAll({
	attributes: ["id", "keyword", "reply", "match", "trigger", "priority"],
	raw: true
});

const data = JSON.stringify(
	allMsg,
	(k, v) => {
		if (k === "match") {
			return ["完全匹配", "前缀匹配", "后缀匹配", "包含匹配", "正则匹配"][v];
		} else if (k === "trigger") {
			return ["群聊和私聊", "群聊", "私聊"][v];
		}
		return v;
	},
	"\t"
);
fs.writeFileSync("./reply.json", data);
