//import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/database'; //importing database
import 'firebase/auth';//importing auth
//OR... require('firebase/auth');

// Firebase config
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Firebase database
const database = firebase.database();

// Google auth provider to authenticate with google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {firebase, googleAuthProvider, database as default};










//.................................................................FIREBASE USAGE GUIDE BELOW...................................................................................





//.........................................................setting/CREATE data

//database.ref().set({
//    name:'Nag B Shankar',
//    age: 27,
//    isSingle: true,
//    stressLevel:6,
//    job:{
//        title:'Web developer',
//        company:"Eli Lilly"
//    },
//    location: {
//        city: 'Bengaluru',
//        country: 'India'
//    }
//})

//this overrides entire data previously set
//database.ref().set('i like rafa and marc')

//to update only those property
//database.ref('name').set('Nag')

//to update nested property
//database.ref('location/city').set('Mangalore')

//to add nested object
//database.ref('attiributes').set({
//    height:5.7,
//    weight:'72Kg'
//})

//set returns a promise, with no data if it was resolved, hence "then" has No arguments passed and error if it was rejected
//database.ref('attiributes').set({
//    height:'5.7 inches',
//    weight:'72Kg'
//}).then(()=>{
//    console.log('yes!!! Attribute set/reset successfully');
//}).catch((e)=>{
//    console.log("oops", e);
//})


//.............................................................REMOVE, we have set all the data from the above set calls

//removing isSingle from database
//database.ref('isSingle').remove()
//                        .then(()=>{console.log('removed successfully')})
//                        .catch((e)=>{console.log('doesnt exist?', e)})

//we can also remove by using set
//database.ref('location/city').set(null)

//..................................................................UPDATing database

//database.ref().update({
//    name:"Nag",
//    age:27,
//    stressLevel:8,
//    'job/title':"Associate Manager",
//     isSingle:null,
//    'location/city':'Bangalore'
//})


//...............................................................Fetching/READ from database

//fetching all data ONCE, only at that given point of time when query happens
//Returns a promise, with data inside "snapshot"
//database.ref().once('value')
//              .then((snapshot)=>{
//                   const val = snapshot.val();
//                   console.log(val); 
//                 })
//               .catch((e)=>{
//                 console.log('Error fetching data ', e);
//                  })

//fetching only required item by specifying inside "ref"
//database.ref('location').once('value')
//              .then((snapshot)=>{
//                   const val = snapshot.val();
//                   console.log(val); 
//                 })
//               .catch((e)=>{
//                 console.log('Error fetching data ', e);
//                  })

//fetching data even when there are changes made somewhere in the application and making sure that our data fetched is up to date
//ON method gives us data whenever there are chnages in the database, here there's no promise, it takes callback funtion as second argument, which keeps executing everytime when data changes, and promise executes only once, it either resolve or reject with a single given value, therefore no use of promise here

//var onValueChange = database.ref().on('value', (snapshot)=>{
//    console.log(snapshot.val());
//}, (e)=>{
//    console.log('error with data fetching', e);
//})

//var onValueChange = database.ref().on('value', (snapshot)=>{
//    //console.log(snapshot.val());
//    const val = snapshot.val(); //to fetch individual data
//    console.log(`${val.name} is working at ${val.job.company}`); 
//}, (e)=>{
//    console.log('error with data fetching', e);
//})

//Note: with ON you're subscribed to data changes

//lets change some data after 10 sec
//setTimeout(()=>{
//    database.ref('name').set('marc');
//}, 10000)

//unsubscribing for changes
//setTimeout(()=>{
//    //database.ref().off() //for full unsubscription
//    database.ref().off('value',onValueChange);//unsubscribing for previously subscribed data by passing 'value' as first argument, otherwise error is thrown
//}, 15000)

//we dont get notified about this change but data has changed in the database
//setTimeout(()=>{
//    database.ref('age').set(45)
//}, 20000)

//.............................................................Working with Arrays

//Firebase doesnt natively support array format

//const notes=[{
//    id:'12',
//    title:"First note",
//    body:"First note body"
//},{
//    id:'27nm93',
//    title:"Second note",
//    body:"Second note body"
//}];

//when we try to store this array on firebase it automatically gets formatted into object structure
//database.ref('notes').set(notes);

//default format on firebase when we try to store an above array
//const firebaseobj={
//    notes:{
//        abcd:{
//             title:"First note",
//             body:"First note body"
//        },
//        efgh:{
//            title:"Second note",
//            body:"Second note body"
//        }
//    }
//}

//to get above format lets use new method called PUSH, it creates random id and store the object data given by us. 
//instead of we giving IDs, we will take keys as IDs generated by firebase

//database.ref('notes').push({
//     title: 'React',
//     body: 'Learning react'
//});

//now if we want to access any note using its randomly generated key
//database.ref('notes/-M6zBkA-o80ksntiQe0x').update({
//    body:"Learning state management tool"
//})

//database.ref('expenses').push({
//     description: 'House Rent',
//     note: 'May month',
//     amount:8925,
//     createdAt:1
//    
//});
//
//database.ref('expenses').push({
//     description: 'RD',
//     note: 'Dad\'s RD Central bank',
//     amount:7000,
//     createdAt:2
//    
//});
//
//database.ref('expenses').push({
//     description: 'Water Bill',
//     note: 'Cauvery water',
//     amount:1200,
//     createdAt:3
//    
//});

//..................................................now FETCHing data which are in array like formate from firebase
//database.ref('expenses').once('value')
//                        .then((snapshot)=>{
//                           
//                             //console.log(snapshot.val());//even this retunrs in object format
//                            
//                             //we have another method just for this format, we can iterate over those item using forEach and push it inside an empty array
//                             const expenses=[];
//                             snapshot.forEach((childSnapshot) => {
//                             expenses.push({
//                                     id: childSnapshot.key,
//                                     ...childSnapshot.val()
//                                   })
//                               });  
//                                console.log(expenses);
//                         }).catch((e)=>{
//                            console.log("error", e)
//                       });

//now subscribing to the changes
//database.ref('expenses').on('value', (snapshot)=>{
//                             const expenses=[];
//                             snapshot.forEach((childSnapshot) => {
//                             expenses.push({
//                                     id: childSnapshot.key,
//                                     ...childSnapshot.val()
//                                   })
//                               });  
//                                console.log(expenses);
//                         })
                      
//child_removed is an one more event wen can subscribe to get the data whenever a child is removed from the firebase version of array format

//child_removed
//database.ref('expenses').on('child_removed', (snapshot)=>{
//    console.log(snapshot.key, snapshot.val());
//})


//child_changed is an one more event wen can subscribe to get the data whenever a child is child_changed from the firebase version of array format

//child_changed
//database.ref('expenses').on('child_changed', (snapshot)=>{
//    console.log(snapshot.key, snapshot.val());
//})


//child_added is an one more event wen can subscribe to get the data whenever a child is added to the firebase version of array format, it gets called for existing items and also wen new item is added 

//child_added
//database.ref('expenses').on('child_added', (snapshot)=>{
//    console.log(snapshot.key, snapshot.val());
//})