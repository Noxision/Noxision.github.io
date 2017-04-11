var ATM = {
    is_auth: false,
    current_user: false,
    current_type: false,

    log: [],

    // all cash of ATM
    cash: 2000,

    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],

    // authorization
    auth: function (number, pin) {
        for (var i = 0; i < this.users.length; ++i) {
            if (this.users[i].number == number && this.users[i].pin == pin) {
                this.is_auth = true;
                this.current_user = i;
                this.current_type = this.users[i].type;
                return 'Hello';
            }
        }
    },

    // check current debet
    check: function () {
        if (this.current_user != false)
            return this.users[this.current_user].debet;
        else
            return 'You mast login';
    },

    // get cash - available for user only
    getCash: function (amount) {
        if ((this.users[this.current_user].debet - amount) >= 0) {
            if ((this.cash - amount) >= 0) {
                this.users[this.current_user].debet -= amount;
                this.cash -= amount;
                return 'The money have been charged';
            } else {
                return 'Sorry, ATM has not enough money';
            }
        } else {
            return 'You have not enough money';
        }
    },

    // load cash - available for user only
    loadCash: function (amount) {
        if (this.current_user != false) {
            this.users[this.current_user].debet += amount;
            return 'Money contributed';
        }
        else
            return 'You mast login';
    },

    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function (addition) {
        if (this.current_type == 'admin') {
            this.cash += addition;
        } else {
            console.log('You are not admin');
        }
    },

    // get report about cash actions - available for admin only - EXTENDED
    getReport: function () {

    },

    // log out
    logout: function () {
        this.is_auth = false;
        this.current_user = false;
        this.current_type = false;
        return 'You are logout';
    }
};