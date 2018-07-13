import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.TEST_DB || 'slack', 'root', 'fcbarcelona123', {
  host: 'localhost',
  operatorsAliases: Sequelize.Op,
  dialect: 'mysql',
  define: {
    underscored: true
  }
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
  Member: sequelize.import('./member'),
  DirectMessage: sequelize.import('./directMessage')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
