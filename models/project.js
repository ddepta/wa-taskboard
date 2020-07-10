module.exports = function(Model, db)
{
    // not needed at the moment

    // Model.extendInclude = [
    //     {
    //         model: db.User,
    //         as: 'from',
    //         attributes: [ 'id', 'firstName', 'lastName' ],
    //         seperate: false
    //     },
    //     {
    //         model: db.User,
    //         as: 'to',
    //         attributes: [ 'id', 'firstName', 'lastName' ],
    //         seperate: false
    //     }
    // ];

    Model.prototype.writeRemotes = function(data)
    {
        const self = this;

        if(typeof data.name !== 'undefined')
        {
            self.name = data.name;
        }
    }
};