let config = 
{
    user: 'jcgg',
    password: 'pass123',
    db_name: 'mydb',
    getURL: function () 
    {
        return `mongodb+srv://${this.user}:${this.password}@cluster0.ohdif.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
    }
}

module.exports = config;