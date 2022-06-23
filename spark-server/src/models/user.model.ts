import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";
import sequelize from "sequelize"

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
        unique:false,
        allowNull: false
    })
    public password!: string;

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
    public account: string;

    @Column({
        type: DataType.STRING,
        unique:false,
        allowNull: false
    })
    public balance: string;

    @Column({
        type: DataType.STRING,
        unique:false,
        allowNull: false
    })
    public private_key: string;

    @Column({
        type: DataType.STRING,
        unique:false,
        allowNull: false,
        defaultValue: sequelize.literal("(CURRENT_TIMESTAMP)")
    })
    public created_at: string;

    @Column({
        type: DataType.STRING,
        unique:false,
        allowNull: false,
        defaultValue: sequelize.literal("(CURRENT_TIMESTAMP)")
    })
    public updated_at: string;
}