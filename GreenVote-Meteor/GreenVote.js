if (Meteor.isClient) {

  Template.hello.greeting = function () {
    return "";
  };

  Template.hello.events({
    'click input' : function () {
      // Meteor.call("postChildLocation",String($("#ParentId").val()) ,String($("#ChildName").val()) , function(e, r) { 
      //     console.log(r);
      //     console.log('Yes');
      // });
      Meteor.call("associateUserLocation",String($("#UserId").val()) ,String($("#LocationId").val()) , function(e, r) { 
          console.log(r);
          console.log('Yes');
      });
    }
  });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.methods({
      associateUserLocation: function (one,two) {
        this.unblock();
        return Meteor.http.post("http://api.grnvote.com/v1/user/"+one,
                   { params: {locations: [two]}, headers: {"Content-Type":"application/json"}});
      },
      postChildLocation: function (one, two) {
        this.unblock();
        return Meteor.http.post("http://api.grnvote.com/v1/location",
                   { params: { parentId: one, name: two } ,headers: {"Content-Type":"application/json"}
                    });
        }
    });
  });
}