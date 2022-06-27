import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";

@Table({ timestamps: false })
export default class images extends Model {
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
    public image_path: string;


    @Column({
        type: DataType.INTEGER,
        unique:false,
        allowNull: false
    })
    public post_id: number;

}