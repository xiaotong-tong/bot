import showText from "xtt-msg";
import { fetchPlugin } from "xtt-msg/plugin-fetch";
import { Reply } from "./db/models/reply.js";
import { segment } from "oicq";

showText.plugins(fetchPlugin);
showText.plugins(({ TextMatch, replaceText }) => {
	return {
		发送者QQ: async () => {
			return await showText.showTextBrowser(`【变量-->>发送者QQ】`);
		},
		发送者昵称: async () => {
			return await showText.showTextBrowser(`【变量-->>发送者昵称】`);
		},
		"qq-当前回复": async () => {
			return await showText.showTextBrowser(`【变量-->>qq-当前回复】`);
		},
		"qq-图片": async (text) => {
			const [path] = await TextMatch.doTextMatchList(text);
			if (!path) {
				return "";
			}
			return "<!0>img" + path + "<!0>";
		},
		"qq-换行": async () => {
			return "\n";
		},
		输入流: async () => {
			return ""; // 输入流不返回任何内容，仅作为一个标识。输入流后的内容不会立即执行，而是等待下一次回复后再执行
			// 同时， 下一次回复的内容会作为变量【输入流】的值，请使用 【变量-->>输入流】获取
		},
		查询所有回复: async () => {
			const data = await Reply.findAll({
				attributes: ["keyword"],
				raw: true
			});

			let res = "";
			data.forEach((item) => {
				res += item.keyword + "\n";
			});
			return res;
		}
	};
});

let getKeywordMap = async () => {
	const keywordMap = await Reply.findAll({
		attributes: ["keyword", "reply", "match", "trigger"],
		order: [["priority", "DESC"]],
		raw: true
	});

	const groupKeywordMap = keywordMap.filter(
		(item) => item.trigger === 1 || item.trigger === 0
	);
	const privateKeywordMap = keywordMap.filter(
		(item) => item.trigger === 2 || item.trigger === 0
	);

	getKeywordMap = () => {
		return {
			keywordMap,
			groupKeywordMap,
			privateKeywordMap
		};
	};
	return {
		keywordMap,
		groupKeywordMap,
		privateKeywordMap
	};
};

let inputStream = {
	start: false,
	value: ""
};

export const message = async (info) => {
	console.log("message");
	console.log("--------------------");
	console.log(info);

	const initMessageVariable = (msg) => {
		showText.showTextBrowser(
			`【变量-->>qq-当前回复-->>${msg}】
			【变量-->>发送者QQ-->>${info.user_id}】
			【变量-->>发送者昵称-->>${info.sender.nickname}】`
		);
	};
	const doReply = (keywordMap, msg) => {
		const refreshMsg = () => {
			if (inputStream.start) {
				let res;
				inputStream.start = false;
				res = inputStream.value;
				inputStream.value = "";
				showText.showTextBrowser(`【变量-->>输入流-->>${msg}】`);
				return res;
			} else {
				for (const item of keywordMap) {
					switch (item.match) {
						case 0:
							if (msg === item.keyword) {
								return item.reply;
							}
							break;
						case 1:
							if (msg.startsWith(item.keyword)) {
								return item.reply;
							}
							break;
						case 2:
							if (msg.endsWith(item.keyword)) {
								return item.reply;
							}
							break;
						case 3:
							if (msg.includes(item.keyword)) {
								return item.reply;
							}
							break;
						case 4:
							if (new RegExp(item.keyword).test(msg)) {
								return item.reply;
							}
							break;
					}
				}
			}
		};

		msg = refreshMsg();

		if (!msg) {
			return;
		}

		if (msg.includes("【输入流】")) {
			const stream = msg.split("【输入流】");
			msg = stream[0];
			inputStream.start = true;
			inputStream.value = stream.splice(1).join("【输入流】");
		}
		showText.showTextBrowser(msg).then((res) => {
			console.log(res);
			if (res.includes("<!0>")) {
				res = res.split("<!0>").map((item) => {
					if (item.startsWith("img")) {
						item = item.replace("img", "");
						return segment.image(item);
					}
					return item;
				});
			}
			if (!res) {
				return;
			}
			info.reply(res);
		});
	};

	if (info.group_id === 754923572) {
		let msg = info.raw_message;
		if (msg?.startsWith("#") || inputStream.start) {
			if (!inputStream.start) {
				msg = msg.replace("#", "");
			}

			initMessageVariable(msg);

			doReply((await getKeywordMap()).groupKeywordMap, msg);
		}
	} else if (info.message_type === "private") {
		let msg = info.raw_message;

		initMessageVariable(msg);

		doReply((await getKeywordMap()).privateKeywordMap, msg);
	}
};
