module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_asset: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('market', 'limit'),
            allowNull: false,
        },
        side: {
            type: DataTypes.ENUM('buy', 'sell'),
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        filled_amount: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('open', 'partial', 'filled', 'cancelled'),
            defaultValue: 'open',
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'orders',
        timestamps: false,
    });

    return Order;
};
