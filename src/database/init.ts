import Db from './index';

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (e) {
    console.error('Error while connecting to the database', e);
  }
};

export default DbInitialize;
