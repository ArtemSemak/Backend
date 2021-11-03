import  Sequelize   from "sequelize"
import   DataTypes   from "sequelize"


const sequelize = new Sequelize('postgres://test:test@127.0.0.1:5432/tododb')

const ToDo = sequelize.define(
    'ToDo',
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'ToDo'
    }
)

  
export default ToDo
