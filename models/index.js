const User = require("./User");
const Quotes = require("./Quotes");
const Reason = require("./Reason");
const User_Quotes = require("./User_Quotes");

User.belongsToMany(Quotes, {
    through: User_Quotes,
    // as: 'user-and-quotes',
    foreignKey: 'user_id'
})

Quotes.belongsToMany(User, {
    through: User_Quotes,
    // as: 'user-and-quotes',
    foreignKey: 'quotes_id'
})

Quotes.belongsTo(Reason, {
    foreignKey: 'reason_id'
});

Reason.hasMany(Quotes, {
    foreignKey: 'reason_id'  
});


module.exports = { User, Quotes, Reason, User_Quotes}