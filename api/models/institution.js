module.exports = function(sequelize, Sequelize) {

    console.log('\tinstitution model loaded');

    const Institution = sequelize.define('institution', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });

    return Institution
};