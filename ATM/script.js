var ATM = {
    is_auth: false,
    current_user: false,
    current_type: false,

    // all cash of ATM
    cash: 2000,

    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],

    // authorization
    auth: function (number, pin) {
        if (number != undefined && pin != undefined) {
            for (var i = 0; i < this.users.length; ++i) {
                if (this.users[i].number == number && this.users[i].pin == pin) {
                    this.is_auth = true;
                    this.current_user = i;
                    this.current_type = this.users[i].type;
                    return 'Hello';
                }
            }
        } else {
            return 'You must enter your account number and pass';
        }
    },

    // check current debet
    check: function () {
        if (this.is_auth != false)
            return this.users[this.current_user].debet;
        else {
            return 'You must login';
        }
    },

    // get cash - available for user only
    getCash: function (amount) {
        if (this.is_auth != false) {
            if (this.current_type == 'user') {
                var user = this.users[this.current_user];
                if ((user.debet - amount) >= 0) {
                    if ((this.cash - amount) >= 0) {
                        user.debet -= amount;
                        this.cash -= amount;
                        this.getReport(user.number + " get from account " + amount + " units");
                        return 'The money have been charged';
                    } else {
                        return 'Sorry, ATM has not enough money';
                    }
                } else {
                    return 'You have not enough money';
                }
            } else {
                return 'You need users rights';
            }
        } else {
            return 'You must login';
        }
    },

    // load cash - available for user only
    loadCash: function (amount) {
        if (this.is_auth != false) {
            if (this.current_type == 'user') {
                var user = this.users[this.current_user];
                user.debet += amount;
                this.getReport(user.number + " load to account " + amount + " units");
                return 'Money contributed';
            }
            else {
                return 'You need users rights';
            }
        } else {
            return 'You must login';
        }
    },

    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function (addition) {
        if (this.is_auth != false) {
            if (this.current_type == 'admin') {
                this.cash += addition;
                this.getReport("Administrator load to ATM " + addition + " units");
                return 'Load cash to ATM - OK!';
            } else {
                return 'You need administrator rights';
            }
        } else {
            return 'You must login';
        }
    },

    // get report about cash actions - available for admin only - EXTENDED
    getReport: function () {
        var log = '';
        return function (data) {
            if (this.is_auth != false) {
                if (data) {
                    log += data + '\n';
                } else {
                    if (this.current_type == 'admin') {
                        return log;
                    }
                    return 'You need administrator rights';
                }
            } else {
                return 'You must login';
            }
        }
    }(),

    // log out
    logout: function () {
        if (this.is_auth != false) {
            this.is_auth = false;
            this.current_user = false;
            this.current_type = false;
            return 'You are logout';
        } else {
            return 'You must login';
        }
    }
};