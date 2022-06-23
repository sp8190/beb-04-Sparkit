import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";

@Table({ timestamps: false })
export default class posts_hashtags extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
        unique:true
      })
    public id: number;

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
    public hashtag_id: number;

}