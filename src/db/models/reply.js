import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const Reply = sequelize.define("Reply", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	keyword: {
		type: DataTypes.STRING,
		allowNull: false
	},
	reply: {
		type: DataTypes.STRING,
		allowNull: false
	},
	match: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0 // 0 完全匹配  1 前缀匹配  2 后缀匹配  3 包含匹配 4 正则匹配
	}
});

Reply.sync();

// Reply.create({
// 	keyword: "喵语:",
// 	reply: "【喵语-->>【文本-取文本右-->>【qq-当前回复】-->>:】】",
// 	match: 1
// });

// const keywordMap = await Reply.findAll({
// 	attributes: ["keyword", "reply", "match"],
// 	raw: true
// });
// console.log(keywordMap);

export { Reply };
