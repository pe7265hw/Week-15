module.exports = (sequlize, DataTypes) => {
    //define the model
    const Student = sequlize.define('Student',{
        //define the columns in the database and validates data
        name:{ 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
        },
        present:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })

    //create or update table in the database
    Student.sync({force: false}).then(()=>{
        console.log('Synced student table')
    })

    return Student
}