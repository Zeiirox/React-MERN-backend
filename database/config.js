const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CNN);
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar BD");
  }
};

module.exports = {
  dbConnection,
};
