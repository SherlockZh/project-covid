// Initialize the App Client
const client = stitch.Stitch.initializeDefaultAppClient("project-yadow");
// Get a MongoDB Service Client
const mongodb = client.getServiceClient(
  stitch.RemoteMongoClient.factory,
  "mongodb-atlas"
);
// Get a reference to the blog database
const db = mongodb.db("project");

const log = console.log

// function displayComments() {
//   var s = db.collection("newArea")
//     .find({
//       "continentEnglishName": "Europe"
//     }, {
//       limit: 10
//     })
//     .toArray();
//     console.log(s[0]);
//     console.log(s[1]);
// }
function addComment() {
  const newComment = document.getElementById("new_comment");
  console.log("add comment", client.auth.user.id)
  db.collection("comments")
    .insertOne({
      owner_id: client.auth.user.id,
      comment: newComment.value
    })
    .then(displayComments);
  newComment.value = "";
}

function addData() {
  const country = document.getElementById("countryEnglishName");
  const number = document.getElementById("addConfirmedCount");
  log("dddd: ", country.value)
  db.collection("newArea")
    .insertOne({
      "countryEnglishName": country.value,
      "confirmedCount": parseInt(number.value)
    })
  console.log(1)
}

function removeData() {
  const data = document.getElementById("removeCountry");
  db.collection("newArea")
    .deleteOne({
      "countryEnglishName": data.value
    })
}

function updateConfirm() {
  const country = document.getElementById("updateCountry");
  const confirmNumber = document.getElementById("updateConfirmedCount");
  db.collection("newArea")
    .updateOne({
      "countryEnglishName": country.value
    }, {
      $set: {
        "confirmedCount": parseInt(confirmNumber.value)
      }
    })
}

function updateDeath() {
  const country = document.getElementById("updateCountry");
  const deadNumber = document.getElementById("deadCount");
  db.collection("newArea")
    .updateOne({
      "countryEnglishName": country.value
    }, {
      $set: {
        "deadCount": parseInt(deadNumber.value)
      }
    })
}

function updateUSConfirm(){
  const state = document.getElementById("getStateConfirm");
  const  number = document.getElementById("USupdateConfirmedCount");
  db.collection("USA")
    .updateOne({
      "stateName": state.value
    }, {
      $set: {
        "confirmedCount": parseInt(number.value)
      }
    })
    console.log(1)
}

function updateUSDeath() {
  const state = document.getElementById("getStateDeath");
  const  number = document.getElementById("USupdateDeathCount");
  db.collection("USA")
    .updateOne({
      "stateName": state.value
    }, {
      $set: {
        "deadCount": parseInt(number.value)
      }
    })
    console.log(2)
}

function updateAmerica() {
  db.collection("USA")
    .updateMany({
      "countryName": "美国"
    }, {
      $set: {
        "countryName": "America"
      }
    })
  console.log("update success")
}

function getNews() {
  db.collection("news")
    .find({}, {limit: 10})
    .toArray()
    .then(docs => {
      console.log("docs: ", docs);
      const html = docs.map(doc =>
        `<div class="mydiv">
         <li>Title: ${doc.title}</li>
         <li>Summary: ${doc.summary}</li>
         <li>SourceUrl: <a href="${doc.sourceUrl}">${doc.sourceUrl}</a></li>
         </div>
         <br/>
        `).join('');
      document.getElementById("newsList").innerHTML = html;
    });
}

function getRumors() {
  db.collection("rumors")
    .find({}, {})
    .toArray()
    .then(docs => {
      console.log("docs: ", docs);
      const html = docs.map(doc =>
        `<div class="mydiv">
         <li>Title: ${doc.title}</li>
         <li>Summary: ${doc.mainSummary}</li>
         <li>SourceUrl: <a href="${doc.sourceUrl}">${doc.sourceUrl}</a></li>
         </div>
         <br/>
        `).join('');
      document.getElementById("rumorsList").innerHTML = html;
    });
}