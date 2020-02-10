module.exports = function(sequelize, Sequelize) {

    console.log('\tdomain model loaded');

    const Domain = sequelize.define('domain', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });

    return Domain;
};