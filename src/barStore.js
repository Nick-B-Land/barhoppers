import { observable } from "mobx";
import PouchDB from "pouchdb";

export let BarStore = observable({
  Bars: []
});
// fetchs the bar database and sets it to the model
BarStore.Fetch = () => {
  // var db = new PouchDB(
  //   "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudantnosqldb.appdomain.cloud/bars"
  // );
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
  );
  db.allDocs({
    include_docs: true,
    attachments: true
  })
    .then(function(result) {
      BarStore.Bars = result.rows;
    })
    .catch(function(err) {
      console.log(err);
    });
};
// adds review to bar database with appropriate fields
BarStore.AddReview = (review, name, user, date) => {
  // var db = new PouchDB(
  //   "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
  // );
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
  );

  BarStore.Bars.forEach(e => {
    if (name === e.doc.Name) {
      let r = {
        SubmittedBy: user,
        SubmittedOn: date,
        Content: review,
        Likes: 0
      };
      e.doc.Reviews.push(r);
      db.get(e.doc._id)
        .then(function(doc) {
          // update
          doc.Reviews.push(r);
          // put them back
          return db.put(doc);
        })
        .then(function() {
          // fetch again
          return db.get(e.doc._id);
        })
        .then(function(doc) {
          e.doc.Reviews = doc.Reviews;
        });
    }
  });
};
// deletes review from database that matches the deleted review
BarStore.DeleteReview = (bname, uname, posted) => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
  );

  BarStore.Bars.forEach(e => {
    if (e.doc.Name === bname) {
      db.get(e.doc._id)
        .then(function(doc) {
          // update
          let time;
          doc.Reviews.forEach(e => {
            if (e.SubmittedBy === uname && e.SubmittedOn === posted) {
              time = e.SubmittedOn;
              doc.Reviews = doc.Reviews.filter(e => e.SubmittedOn !== time);
            }
          });
          // put them back
          return db.put(doc);
        })
        .then(function() {
          // fetch again
          return db.get(e.doc._id);
        })
        .then(function(doc) {
          e.doc.Reviews = doc.Reviews;
        });
    }
  });
};
// updates a bars reviews likes in bar database
BarStore.LikeReview = (liked, name, postedBy, postedOn) => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
  );

  if (liked === false) {
    BarStore.Bars.forEach(e => {
      if (e.doc.Name === name) {
        e.doc.Reviews.forEach(z => {
          if (z.SubmittedBy === postedBy && z.SubmittedOn === postedOn) {
            let l = z.Likes;
            db.get(e.doc._id)
              .then(function(doc) {
                // update
                doc.Reviews.forEach(a => {
                  if (
                    a.SubmittedBy === postedBy &&
                    a.SubmittedOn === postedOn
                  ) {
                    a.Likes = l + 1;
                  }
                });
                // put them back
                return db.put(doc);
              })
              .then(function() {
                // fetch again
                return db.get(e.doc._id);
              })
              .then(function(doc) {
                e.doc.Reviews = doc.Reviews;
              });
          }
        });
      }
    });
  } else if (liked === true) {
    BarStore.Bars.forEach(e => {
      if (e.doc.Name === name) {
        e.doc.Reviews.forEach(z => {
          if (z.SubmittedBy === postedBy && z.SubmittedOn === postedOn) {
            let l = z.Likes;
            db.get(e.doc._id)
              .then(function(doc) {
                // update
                doc.Reviews.forEach(a => {
                  if (
                    a.SubmittedBy === postedBy &&
                    a.SubmittedOn === postedOn
                  ) {
                    a.Likes = l - 1;
                  }
                });
                // put them back
                return db.put(doc);
              })
              .then(function() {
                // fetch again
                return db.get(e.doc._id);
              })
              .then(function(doc) {
                e.doc.Reviews = doc.Reviews;
              });
          }
        });
      }
    });
  }
};
//  updates a bars likes in bar database
BarStore.HandleHops = (liked, name) => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix:c83c3c565c423c14d0cb632842ec247e9d82e0ed8c0ce81e4eab8569d13b4b90@3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/bars"
  );

  if (liked === false) {
    BarStore.Bars.forEach(e => {
      if (e.doc.Name === name) {
        let l = e.doc.Likes;
        db.get(e.doc._id)
          .then(function(doc) {
            // update their age
            doc.Likes = l + 1;
            // put them back
            return db.put(doc);
          })
          .then(function() {
            // fetch mittens again
            return db.get(e.doc._id);
          })
          .then(function(doc) {
            e.doc.Likes = doc.Likes;
          });
      }
    });
  } else if (liked === true) {
    BarStore.Bars.forEach(e => {
      if (e.doc.Name === name) {
        let l = e.doc.Likes;
        db.get(e.doc._id)
          .then(function(doc) {
            // update their age
            doc.Likes = l - 1;
            // put them back
            return db.put(doc);
          })
          .then(function() {
            // fetch mittens again
            return db.get(e.doc._id);
          })
          .then(function(doc) {
            e.doc.Likes = doc.Likes;
          });
      }
    });
  }
};

export default BarStore;
