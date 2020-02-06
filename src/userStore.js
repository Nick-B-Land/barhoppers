import { observable } from "mobx";
import PouchDB from "pouchdb";

export let UserStore = observable({
  _id: "",
  Username: "",
  Favourites: [],
  ReviewsPosted: [],
  ReviewsLiked: [],
  BarsLiked: [],
  IsLoggedIn: false
});
// fetchs a user from the user database and assigns the model to it
UserStore.Fetch = id => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  );

  // var db = new PouchDB(
  //   "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudantnosqldb.appdomain.cloud/users"
  // );

  db.get(id).then(function(doc) {
    UserStore._id = doc._id;
    UserStore.Username = doc.Username;
    UserStore.Favourites = doc.Favourites;
    UserStore.ReviewsPosted = doc.ReviewsPosted;
    UserStore.ReviewsLiked = doc.ReviewsLiked;
    UserStore.BarsLiked = doc.BarsLiked;
    UserStore.IsLoggedIn = true;
  });
};
// resets userStore to defaults
UserStore.Clear = () => {
  UserStore._id = "";
  UserStore.Username = "";
  UserStore.Favourites = [];
  UserStore.ReviewsPosted = [];
  UserStore.ReviewsLiked = [];
  UserStore.BarsLiked = [];
  UserStore.IsLoggedIn = false;
};
// adds review to current users database
UserStore.AddReview = (name, date, content) => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  );

  let review = {
    Barname: name,
    PostedOn: date,
    Content: content
  };
  db.get(UserStore._id)
    .then(function(doc) {
      // update
      doc.ReviewsPosted.push(review);
      // put back
      return db.put(doc);
    })
    .then(function() {
      // fetch again
      return db.get(UserStore._id);
    })
    .then(function(doc) {
      UserStore.ReviewsPosted = doc.ReviewsPosted;
    });
};
// deletes a review from the selected users database
UserStore.DeleteReview = (name, posted) => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  );

  db.get(UserStore._id)
    .then(function(doc) {
      // update their age
      let time;
      doc.ReviewsPosted.forEach(e => {
        if (e.Barname === name && e.PostedOn === posted) {
          time = e.PostedOn;
          doc.ReviewsPosted = doc.ReviewsPosted.filter(
            e => e.PostedOn !== time
          );
        }
      });
      // put them back
      return db.put(doc);
    })
    .then(function() {
      // fetch mittens again
      return db.get(UserStore._id);
    })
    .then(function(doc) {
      UserStore.ReviewsPosted = doc.ReviewsPosted;
    });
};
// adds or removes a favorite bar from the selected users database
UserStore.HandleFavs = name => {
  // var db = new PouchDB(
  //   "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  // );

  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  );

  if (!UserStore.Favourites.includes(name)) {
    db.get(UserStore._id)
      .then(function(doc) {
        // update
        doc.Favourites.push(name);
        // put back
        return db.put(doc);
      })
      .then(function() {
        // fetch again
        return db.get(UserStore._id);
      })
      .then(function(doc) {
        //sync userStore
        UserStore.Favourites = doc.Favourites;
      });
  } else if (UserStore.Favourites.includes(name)) {
    db.get(UserStore._id)
      .then(function(doc) {
        // update
        doc.Favourites = doc.Favourites.filter(e => e !== name);
        // put back
        return db.put(doc);
      })
      .then(function() {
        // fetch again
        return db.get(UserStore._id);
      })
      .then(function(doc) {
        UserStore.Favourites = doc.Favourites;
      });
  }
};
// adds or removes a review liked from selected users database
UserStore.HandleReviewHops = (postedBy, postedOn) => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  );

  let match = false;
  UserStore.ReviewsLiked.forEach(e => {
    if (e.PostedBy === postedBy && e.PostedOn === postedOn) {
      match = true;
      db.get(UserStore._id)
        .then(function(doc) {
          // update
          doc.ReviewsLiked = doc.ReviewsLiked.filter(
            f => f.PostedOn !== postedOn
          );
          // put back
          return db.put(doc);
        })
        .then(function() {
          // fetch again
          return db.get(UserStore._id);
        })
        .then(function(doc) {
          UserStore.ReviewsLiked = doc.ReviewsLiked;
        });
    }
  });

  if (match === false) {
    let obj = {
      PostedBy: postedBy,
      PostedOn: postedOn
    };
    db.get(UserStore._id)
      .then(function(doc) {
        // update
        doc.ReviewsLiked.push(obj);
        // put back
        return db.put(doc);
      })
      .then(function() {
        // fetch again
        return db.get(UserStore._id);
      })
      .then(function(doc) {
        UserStore.ReviewsLiked = doc.ReviewsLiked;
      });
  }
};
// adds or removes a bar liked from the selected users database
UserStore.HandleHops = name => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/users"
  );

  if (!UserStore.BarsLiked.includes(name)) {
    db.get(UserStore._id)
      .then(function(doc) {
        doc.BarsLiked.push(name);
        return db.put(doc);
      })
      .then(function() {
        return db.get(UserStore._id);
      })
      .then(function(doc) {
        UserStore.BarsLiked = doc.BarsLiked;
      });
  } else if (UserStore.BarsLiked.includes(name)) {
    db.get(UserStore._id)
      .then(function(doc) {
        doc.BarsLiked = doc.BarsLiked.filter(e => e !== name);
        return db.put(doc);
      })
      .then(function() {
        return db.get(UserStore._id);
      })
      .then(function(doc) {
        UserStore.BarsLiked = doc.BarsLiked;
      });
  }
};

export default UserStore;
