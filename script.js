// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    
} from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEIvttyKpDZWaLN6uUVwOEy_o-RyNX4sk",
  authDomain: "recipe-app-a4ae0.firebaseapp.com",
  projectId: "recipe-app-a4ae0",
  storageBucket: "recipe-app-a4ae0.appspot.com",
  messagingSenderId: "900630366778",
  appId: "1:900630366778:web:a0bbb83f5098c1453c8303",
  measurementId: "G-39PGKHH6E9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user);
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.message);
        });
});

// Handle signup
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signup successful:', userCredential.user);
            window.location.href = 'index.html'; // Redirect to login page
        })
        .catch((error) => {
            console.error('Signup failed:', error);
            alert('Signup failed: ' + error.message);
        });
});

// Spoonacular API Function Example
function fetchRecipes(ingredients) {
    const apiKey = '5a8502e9d43d4cb195b558221c7f0a67';
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(recipes => {
            console.log('Recipes fetched:', recipes);
            // Handle displaying recipes here
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}
