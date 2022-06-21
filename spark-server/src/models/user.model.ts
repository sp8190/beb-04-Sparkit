import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";

@Table({ timestamps: false })
export default class users extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
        unique:true
      })
    public id: number;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull: false
    })
    public email: string;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull: false
    })
    public nickname!: string;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull: false
    })
    public public_key: string;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull: false
    })
    public private_key: string;
}