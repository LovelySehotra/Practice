import {
	DataTypes,
	Model,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from "sequelize";
// import bcrypt from "bcryptjs";
// import { UserType } from "@/types";

export class UserModel extends Model<
	InferAttributes<UserModel>,
	InferCreationAttributes<UserModel>
> {
	declare id: CreationOptional<string>;
	declare password: string;
	declare bio: CreationOptional<string>;
	declare headline: CreationOptional<string>;
	declare email: string;
	declare phone: CreationOptional<number>;
	declare avatar: CreationOptional<string>;
	declare displayName: CreationOptional<string>;
	// declare _userTypes: UserType[];
	declare _resetToken: string | null;
	// declare _verifyEmail: string | null;
	declare _courseInvite: string | null;
	// declare isVerified: boolean;

	// async validateCredentials(password: string) {
	// 	return await bcrypt.compare(password, this.password);
	// }
}

export const userModel = (db: Sequelize) => {
	UserModel.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
				allowNull: false
			},
			displayName: {
				type: DataTypes.STRING,
				allowNull: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			bio: {
				type: DataTypes.STRING,
				allowNull: true
			},
			headline: {
				type: DataTypes.STRING,
				allowNull: true
			},
			phone: {
				type: DataTypes.INTEGER,
				allowNull: true,
				unique: true
			},
			avatar: {
				type: DataTypes.STRING,
				allowNull: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			// _userTypes: {
			// 	type: DataTypes.ARRAY(DataTypes.STRING),
			// 	allowNull: false,
			// 	defaultValue: ["student"]
			// },
			_resetToken: {
				type: DataTypes.STRING,
				allowNull: true
			},
			// _verifyEmail: {
			// 	type: DataTypes.STRING,
			// 	allowNull: true
			// },
			_courseInvite: {
				type: DataTypes.STRING,
				allowNull: true
			},
			// isVerified: {
			// 	type: DataTypes.BOOLEAN,
			// 	allowNull: true,
			// 	defaultValue: false
			// }
		},

		{
			sequelize: db,
			modelName: "User",
			hooks: {
				beforeSave: async (user) => {
					if (user.changed("password")) {
						// user.password = await bcrypt.hash(user.password, 12);
					}
				}
			}
		}
	);

	return UserModel;
};
