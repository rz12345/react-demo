const serviceURL = './db/';
const API = {
    get:{
        item: serviceURL + '/items.json',
        category: serviceURL + '/categories.json',
        table: serviceURL + '/tables.json',
        payment: {
            today: serviceURL + '/payments.json'
        }
    }
};

module.exports = API;
