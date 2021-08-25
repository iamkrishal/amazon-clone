var firebaseConfig = {
    apiKey: "AIzaSyC9_rSgzkRVARi0Ykbr7rTETZgh2GaTIgc",
    authDomain: "clone-two-94e50.firebaseapp.com",
    projectId: "clone-two-94e50",
    storageBucket: "clone-two-94e50.appspot.com",
    messagingSenderId: "834125784594",
    appId: "1:834125784594:web:87927080958f953102dacb",
    measurementId: "G-1Y940EZNVB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();