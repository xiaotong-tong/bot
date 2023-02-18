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
// 	keyword: "介绍",
// 	reply: `【JSON-->>
// 	【访问-->>https://api.cngal.org/api/home/Search?text=【文本-取文本右-->>【qq-当前回复】-->>介绍】&types=role&types=game】
// 	-->>[pagedResultDto][data][0][entry][name]】`,
// 	match: 1
// });

// Reply.update(
// 	{
// 		reply: `【变量-->>信息-->>【JSON-->>【访问-->>https://api.cngal.org/api/home/Search?text=【文本-取文本右-->>【qq-当前回复】-->>介绍】&types=role&types=game】-->>[pagedResultDto][data][0][entry]】】
// 		【qq-图片-->>【JSON-->>【变量-->>信息】-->>[mainImage]】】
// 		【JSON-->>【变量-->>信息】-->>[name]】
// 		【JSON-->>【变量-->>信息】-->>[briefIntroduction]】`
// 	},
// 	{
// 		where: {
// 			id: 3
// 		}
// 	}
// );

export { Reply };
