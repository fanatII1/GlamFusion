<script setup>
import { ref, onMounted } from "vue";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from '../../../firebase'

const isSignUpMode = ref(false);
const email = ref('');
const password = ref('');

//providers
const googleProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

//signUp with email and password
const emailPasswordSignUpSubmit = () => {
    console.log('SIGN UP', email.value, password.value)
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential)=> console.log(userCredential))
    .catch((error) => console.log(`error in sign up: ${error}`))
}

//signIn with email and password
const emailPasswordSignInSubmit = () => {
    console.log('SIGN IN', email.value, password.value)
}

//signIn with Google
const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => console.log(result.user))
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ERROR:', errorCode, errorMessage)
    })
}

//signIn with Twitter
const signInWithTwitter = () => {
    signInWithPopup(auth, facebookAuthProvider)
    .then((result) => console.log(result.user))
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ERROR', errorCode, errorMessage)
    })
}

const toggleMode = () => {
    isSignUpMode.value = !isSignUpMode.value;
};

// Event listeners for button clicks
onMounted(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const sign_in_btn2 = document.querySelector("#sign-in-btn2");
    const sign_up_btn2 = document.querySelector("#sign-up-btn2");

    sign_up_btn.addEventListener("click", toggleMode);
    sign_in_btn.addEventListener("click", toggleMode);
    sign_up_btn2.addEventListener("click", toggleMode);
    sign_in_btn2.addEventListener("click", toggleMode);
});
</script>

<template>
    <main id="auth-wrapper">
        <div class="container" :class="{ 'sign-up-mode': isSignUpMode }">
            <div class="signin-signup">
                <form @submit.prevent="emailPasswordSignUpSubmit" class="sign-in-form">
                    <h2 class="title">Sign in</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input v-model="email" type="text" placeholder="Email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input v-model="password" type="password" placeholder="Password">
                    </div>
                    <input type="submit" value="Login" class="btn">
                    <p class="social-text">Or Sign in with social platform</p>
                    <div class="social-media">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook"  @click="signInWithTwitter"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-google"  @click="signInWithGoogle"></i>
                        </a>
                    </div>
                    <p class="account-text">Don't have an account? <a href="#" id="sign-up-btn2">Sign up</a></p>
                </form>
                <form @submit.prevent="emailPasswordSignInSubmit" class="sign-up-form">
                    <h2 class="title">Sign up</h2>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input v-model="email" type="text" placeholder="Email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input v-model="password" type="password" placeholder="Password">
                    </div>
                    <input type="submit" value="Sign up" class="btn">
                    <p class="social-text">Or Sign in with social platform</p>
                    <div class="social-media">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook"  @click="signInWithTwitter"></i>
                        </a>
                        <a href="#" class="social-icon" onclick="signInWithGoogle">
                            <i class="fab fa-google"></i>
                        </a>
                    </div>
                    <p class="account-text">Already have an account? <a href="#" id="sign-in-btn2">Sign in</a></p>
                </form>
            </div>
            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>Elevate Your Look - Unlock Your Account</h3>
                        <p>Step into a world of glamour and style. Unlock your account and book with us effortlessly!</p>
                        <button class="btn" id="sign-in-btn">Sign in</button>
                    </div>
                    <!-- <img src="signin.svg" alt="" class="image"> -->
                </div>
                <div class="panel right-panel">
                    <div class="content">
                        <h3><span>Elevate Your Look</span> - Unlock Your Account</h3>
                        <p>Step into a world of glamour and style. Unlock your account and book with us effortlessly!</p>
                        <button class="btn" id="sign-up-btn">Sign up</button>
                    </div>
                    <!-- <img src="signup.svg" alt="" class="image"> -->
                </div>
            </div>
        </div>
    </main>
</template>
  
<style>
#auth-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

body {
    background-color: #fff;
}

/* Hide the Navbar for the auth page --note : .navbar is in Navbar.vue*/
.navbar {
    display: none;
}

.container{
    position: relative;
    width: 50vw;
    height: 60vh;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);

}

.container::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 100%;
    height: 100%;
    background: #000000;
    transform: translateX(100%);
    transition: 1s ease-in-out;
}

.signin-signup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 5;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 40%;
    min-width: 238px;
    padding: 0 10px;
}

form.sign-in-form {
    opacity: 1;
    transition: 0.5s ease-in-out;
    transition-delay: 1s;
}

form.sign-up-form {
    opacity: 0;
    transition: 0.5s ease-in-out;
    transition-delay: 1s;
}

.title {
    font-size: 35px;
    color: #d69c4a ;
    margin-bottom: 10px;
}

.input-field {
    width: 100%;
    height: 50px;
    background: #f0f0f0;
    margin: 10px 0;
    border: 2px solid #d69c4a ;
    border-radius: 50px;
    display: flex;
    align-items: center;
}

.input-field i {
    flex: 1;
    text-align: center;
    color: #666;
    font-size: 18px;
}

.input-field input {
    flex: 5;
    background: none;
    border: none;
    outline: none;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: #ababab;
}

.btn {
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 50px;
    background: #d69c4a ;
    color: #fff;
    font-weight: 600;
    margin: 10px 0;
    text-transform: uppercase;
    cursor: pointer;
}

.btn:hover {
    background: #d69c4a;
}

.social-text {
    margin: 10px 0;
    font-size: 16px;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ababab;
    border: 1px solid #ababab;
    border-radius: 50px;
    margin: 0 5px;
}

a {
    text-decoration: none;
}

.social-icon:hover {
    color: #d69c4a ;
    border-color: #d69c4a ;
}

.panels-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 35%;
    min-width: 238px;
    padding: 0 10px;
    text-align: center;
    z-index: 6;
}

.left-panel {
    pointer-events: none;
}

.content {
    color: #fff;
    transition: 1.1s ease-in-out;
    transition-delay: 0.5s;
}

#d69c4a

.panel h3 span{
    color: #d69c4a;
}

.panel p {
    font-size: 15px;
    padding: 10px 0;
}

.image {
    width: 100%;
    transition: 1.1s ease-in-out;
    transition-delay: 0.4s;
}

.left-panel .image,
.left-panel .content {
    transform: translateX(-200%);
}

.right-panel .image,
.right-panel .content {
    transform: translateX(0);
}

.account-text {
    display: none;
}

/*Animation*/
.container.sign-up-mode::before {
    transform: translateX(0);
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
    transform: translateX(200%);
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
    transform: translateX(0);
}

.container.sign-up-mode form.sign-in-form {
    opacity: 0;
}

.container.sign-up-mode form.sign-up-form {
    opacity: 1;
}

.container.sign-up-mode .right-panel {
    pointer-events: none;
}

.container.sign-up-mode .left-panel {
    pointer-events: all;
}

/*Responsive*/
@media (max-width:779px) {
    .container {
        width: 100vw;
        height: 100vh;
    }
}

@media (max-width:635px) {
    .container::before {
        display: none;
    }

    form {
        width: 80%;
    }

    form.sign-up-form {
        display: none;
    }

    .container.sign-up-mode2 form.sign-up-form {
        display: flex;
        opacity: 1;
    }

    .container.sign-up-mode2 form.sign-in-form {
        display: none;
    }

    .panels-container {
        display: none;
    }

    .account-text {
        display: initial;
        margin-top: 30px;
    }
}

@media (max-width:320px) {
    form {
        width: 90%;
    }
}
</style>
  