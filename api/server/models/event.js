module.exports = function(sequelize, Sequelize) {

    console.log('\tevent model loaded');

    const Event = sequelize.define('event', {
        // attributes
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT('medium')
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        // options
    });

    return Event;
};