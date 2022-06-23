import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";
import sequelize from "sequelize"

@Table({ timestamps: false })
export default class likes extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
        unique:true
      })
    public id: number;

    @Column({
        type: DataType.STRING,
        unique:false,
        allowNull: false,
        defaultValue: sequelize.literal("(CURRENT_TIMESTAMP)")
    })
    public created_at: string;

    @Column({
        type: DataType.INTEGER,
        unique:false,
        allowNull: false
    })
    public user_id: number;

    @Column({
        type: DataType.INTEGER,
        unique:false,
        allowNull: false
    })
    public post_id: number;

}