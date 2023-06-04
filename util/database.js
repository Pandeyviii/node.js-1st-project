const Sequelize=require("sequelize");
const sequelize=new Sequelize("expense","root","Admin123",{
    dialect:"mysql",
    host:"localhost"
});
module.exports=sequelize;