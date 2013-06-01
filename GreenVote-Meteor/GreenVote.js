if (Meteor.isClient) {



// Calling the appropriate functions when clicked...ask me when you wanna tinker with these
  Template.User.events({
    'click #GetLocations' : function () {
      Meteor.call("GetUsersLocations",String($("#UserId").val()), function(e, r) { 
          console.log(r.data.locations);
      });
    },
    'click #AssociateUser' : function() {
      Meteor.call("AssociateUserWithLocation",String($("#UserId").val()) ,String($("#LocationId").val()) , function(e, r) { 
          console.log(r.data);
      });
    }
  });

  Template.Location.events({
    'click #MakeChild' : function() {
      Meteor.call("CreateChildLocation",String($("#LocationId").val()) ,String($("#ChildName0").val()) , function(e, r) { 
          console.log(r.data);
      });
    }
  });

}


//DO NOT TOUCH THIS
if (Meteor.isServer) {
    Meteor.startup(function () {
    Meteor.methods({
      AssociateUserWithLocation: function (userId,locationId) {
        this.unblock();
        User = Meteor.http.get("http://api.grnvote.com/v1/user/"+userId, {headers: {"Content-Type":"application/json"}}).data;
        console.log(User);
        if(User.locations.indexOf(locationId) == -1) {
          User.locations.push(locationId);
          console.log("Inside");
          result = Meteor.http.put("http://api.grnvote.com/v1/user/"+userId, {
            data: {locations: User.locations }, 
            headers: {"Content-Type":"application/json"}
          });
          return result;
        }
        return null;
      },
      GetUsersLocations: function (userId) {
        this.unblock();
        return Meteor.http.get("http://api.grnvote.com/v1/user/"+userId);
      },
      CreateChildLocation: function(parentId, newname) {
        this.unblock();
        result = Meteor.http.post("http://api.grnvote.com/v1/location/", {
          data: {
            parentId: String(parentId),
            name: String(newname)}
          , 
          headers: {"Content-Type":"application/json"}
        });
        return result;
      }
    });
  });
}