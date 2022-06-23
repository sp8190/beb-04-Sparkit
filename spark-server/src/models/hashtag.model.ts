import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";

@Table({ timestamps: false })
export default class hashtags extends Model {
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
    public hashtag: string;

}