//  // Import the functions you need from the SDKs you need
// //  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
// //  import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyAGg7y_wHdrwIHuJxMJK7uyRi_fHMrOGBs",
//     authDomain: "saylani-app-project.firebaseapp.com",
//     projectId: "saylani-app-project",
//     storageBucket: "saylani-app-project.appspot.com",
//     messagingSenderId: "1033220685942",
//     appId: "1:1033220685942:web:c5dc2fba17259b29a5df57",
//     measurementId: "G-NZWH57D2LS"
//   };


// const app=firebase.initializeApp(firebaseConfig);
// const signUp=()=>{
//     let userName=document.getElementById('username').value;
//     let email=document.getElementById('email').value;
//     let phoneNumber=document.getElementById('phonenumber').value;
//     let password=document.getElementById('password').value;
// //     firebase.auth().createUserWithEmailAndPassword(email, password,)
// //     .then((userCredential) => {
// //         // Signed in 
// //         var user = userCredential.user;
// //         writeUserData(user.uid, email, password);
// //         console.log("user created successfully.... \n", user)

// //         // ...
// //     })
// //     .catch((error) => {
// //         var errorCode = error.code;
// //         var errorMessage = error.message;
// //         console.log("Login error:", errorCode, errorMessage);
// //     });
// // }
// firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//   })
// }
const app = firebase.initializeApp(firebaseConfig);
console.log(app)

const signup = () => {
    let username = document.getElementById('username').value;
    let contact = document.getElementById('phonenumber').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    // let role = 'User'
    let role = document.querySelector(".roleBtn").value;
    

    console.log(email, password, role)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                role: role,
                contact: contact,
                email: email,
                password: password
            })
                .then(() => {
                    const user = { email: email };
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log('User created successfully.')
                    window.location.href = './signIn.html'
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });
}

const signin = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user)
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val()
                    if (userData.role === 'Admin') {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log('User created successfully.')
                        window.location.href = "./adminAddproduct.html"
                    }
                    else {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = "./home.html"
                    }
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        })
}