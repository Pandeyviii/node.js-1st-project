const Sequelize=require("sequelize");
const sequelize=require("../util/database");

const Expense=sequelize.define("expense",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    Amount:{
        type:Sequelize.INTEGER,
    },
    Description:{
        type:Sequelize.STRING,
    },
    Category:{
        type:Sequelize.STRING,
    }
});
module.exports=Expense;