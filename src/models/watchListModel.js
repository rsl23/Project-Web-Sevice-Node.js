module.exports = (sequelize, DataTypes) => {
    const Watchlist = sequelize.define('watchlist', {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id_asset: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'watchlist',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    });

    Watchlist.associate = function (models) {
        Watchlist.belongsTo(models.User, { foreignKey: 'id_user' });
        Watchlist.belongsTo(models.asset, { foreignKey: 'id_asset' });
    };

    return Watchlist;
};