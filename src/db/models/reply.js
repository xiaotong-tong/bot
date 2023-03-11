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

export { Reply };
