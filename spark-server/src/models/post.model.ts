import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";
import sequelize from "sequelize"

@Table({ timestamps: false })
export default class posts extends Model {
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
        allowNull: true
    })
    public title: string;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull: true
    })
    public post_content: string;

    @Column({
        type: DataType.INTEGER,
        unique:false,
        allowNull: true
    })
    public user_id: number;

    @Column({
        type: DataType.STRING,
        unique:false,
        allowNull: false,
        defaultValue: sequelize.literal("(CURRENT_TIMESTAMP)")
    })
    public created_at: string;

}