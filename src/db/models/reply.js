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
	},
	trigger: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0 // 0 无限制  1 群聊  2 私聊
	},
	priority: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
});

Reply.sync();
// Reply.sync({ alter: true }); // 会同步模型到数据库中，包括新增字段

// Reply.create({
// 	keyword: "^.r(\\d*)[dD](\\d+)$",
// 	reply: `【随机数-->>1-->>【变量-->>$2】】`,
// 	match: 4
// });

// Reply.update(
// 	{
// 		reply: `【变量-->>信息-->>【JSON-->>【访问-->>https://api.cngal.org/api/home/Search?text=【文本-取文本右-->>【qq-当前回复】-->>介绍】&types=role&types=game】-->>[pagedResultDto][data][0][entry]】】
// 		【qq-图片-->>【JSON-->>【变量-->>信息】-->>[mainImage]】】
// 		【JSON-->>【变量-->>信息】-->>[name]】【qq-换行】
// 		【JSON-->>【变量-->>信息】-->>[briefIntroduction]】`
// 	},
// 	{
// 		where: {
// 			id: 3
// 		}
// 	}
// );

// Reply.destroy({
// 	where: {
// 		id: 5
// 	}
// });

export { Reply };
