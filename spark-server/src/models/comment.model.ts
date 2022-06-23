import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";

@Table({ timestamps: false })
export default class comments extends Model {
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
        allowNull: false
    })
    public comment: string;

    @Column({
        type: DataType.INTEGER,
        unique:false,
        allowNull: false
    })
    public post_id: number;

    @Column({
        type: DataType.INTEGER,
        unique:false,
        allowNull: false
    })
    public user_id: number;

}