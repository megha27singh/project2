$(function () {
    var User = function (data) {
        this.userName = ko.observable(data.userName);
        this.userEmail = ko.observable(data.userEmail);
        this.userAddress = ko.observable(data.userAddress);
        this.userContact = ko.observable(data.userContact);
        this.userSender = ko.observable(data.userSender);
    };

    User.prototype.addToDB = function () {
        var request = $.ajax({
            type: "POST",
            url: "/saveuser",
            dataType: "json",
            data: {
                userName: this.userName(),
                userEmail: this.userEmail(),
                userAddress: this.userAddress(),
                userContact: this.userContact(),
                userSender: this.userSender()
            }
        });

        request.done(function (response) {
            viewModel.users.push(new User({
                userName: response.userName,
                userEmail: response.userEmail,
                userAddress: response.userAddress,
                userContact: response.userContact,
                userSender: response.userSender
            }));
        });
    }

    var ExpensesViewModel = function () {
        var self = this;
        self.users = ko.observableArray();

        self.addUser = function () {
            var user = new User({
                userName: $('#userName').val(),
                userEmail: $('#userEmail').val(),
                userAddress: $('#userAddress').val(),
                userContact: $('#userContact').val(),             
                userSender: $('#userSender').val()
            });


            user.addToDB();
        }

        var refresh = function () {
            var request = $.ajax({
                url: "/getusers",
                type: "GET",
                dataType: "json"
            });

            request.done(function (response) {
                for (var i = 0; i < response.length; i++) {
                    self.users.push(new User(response[i]));
                }
            });

            request.fail(function (jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            });

        }
        //refresh immediately to load initial data
        refresh();

    };


    var viewModel = new ExpensesViewModel();

    //insert some fake users for now
    viewModel.users.push(new User({
        userName: "Anil Vishvkarma",
        userEmail: "anil@gmail.com",
        userAddress: "Indore-Madhya Pradesh",
        userContact: "020 6747 6747",
        userSender: "aaaaaaa"
    }));

    ko.applyBindings(viewModel);
});