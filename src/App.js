import "./css/global.css"
import "./css/splashScreen.css"
import "./css/verifyEmail.css"
import "typeface-roboto"
import ActionButton from "./components/Action Commands/ActionButton";
import AppDataController from "./modules/dataController/AppDataController";
import Header from './components/Header';

import ActionMenu from "./components/Action Commands/ActionMenu";
import { connect } from "react-redux";
import SectionList from "./components/newSection/SectionList";


import Sidebar from "./components/otherDisplays/sideBarList";
import SideList from "./components/otherDisplays/sideList";

import SideBarBackground from "./components/SideBarBackground";


import {useCollection} from "react-firebase-hooks/firestore";
import {database} from "./modules/dataController/firestore"
import {collectionName} from "./modules/dataController/firestore";
import PriorityMenu from "./components/newSection/priorityMenu";
import firebase from "firebase/compat";
import { sendEmailVerification } from "firebase/auth";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import store from "./modules/dataController/store";
import ShareMenu from "./components/newSection/shareMenu";
import RemoveSharedMenu from "./components/newSection/removeSharedMenu";

// The above contains lots of import statements from different components, stylesheets and libraries.






// create the authorization in firebase
// google log in/sign up functionality

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// function to send verify emails.
// currently it doesn't really do anything,
// as firestore rules aren't implemented yet
// to remove access from non-verified email users.
function verifyEmail() {
    console.log(auth.currentUser.email)
    auth.currentUser.sendEmailVerification();
}

// App contains the many helper functions and components needed for the splash screen, as well as
// much of the splash screen functionality.

function App(props) {
    const [user, loading, error] = useAuthState(auth);


    // This will return a menu to sign up if the sign up button is pressed in the
    // splash screen.

    function SignUpMenu(){
        return(
            <div>
                <div className="SignUpTitle">Let's Get Started!</div>
                <div className="SplashScreenBlurredBackground"
                     onClick={() => AppDataController.toggleSignUpMenu()}></div>
                <input type="email" placeholder="Your email" className="EmailInput" id="EmailValue"/>
                <input type="password" placeholder="Your password" className="EmailInput" id="PasswordValue"/>
                <SignUp></SignUp>
            </div>)
    }

    // This will return a menu to sign in if the sign up button is pressed in the
    // splash screen.

    function SignInMenu(){
        return(
            <div>
                <div className="SignUpTitle">Welcome Back!</div>
                <div className="SplashScreenBlurredBackground"
                     onClick={() => AppDataController.toggleSignInMenu()}></div>
                <input type="email" placeholder="Your email" className="EmailInput" id="EmailValue"/>
                <input type="password" placeholder="Your password" className="EmailInput" id="PasswordValue"/>
                <SignIn></SignIn>
            </div>)

    }

    // This will create a small banner asking the user to verify their email in the signed in app
    // if their email is not verified.

    function VerifyYourEmail(props) {
        return (
            <div className="verifyEmailBanner">
                <button
                    className="verifyEmailBanner"
                    onClick={verifyEmail}>
                    You need to verify your email before accessing app features. Click here to send a verification email!
                </button>
            </div>

        )
    }



    // gets the user authentication status, shows the app once signed in.
    // also shows the verify email banner if you're not verified.
    if (loading) {
        return <p>Checking...</p>;

    } else if (user) {
        return <div>
            <AppSignedIn {...props} user={user}/>
            {!user.emailVerified && <VerifyYourEmail/>}
        </div>
    }

    // This will show the result if you are not signed in and are at the splash screen.

    else {

        // used for creating a transparency layer which is clickable.

        let cssTransparencyID
        if(props.signInMenuStatus || props.signUpMenuStatus){
            cssTransparencyID = "toggledTransparency"
        }
        else{
            cssTransparencyID = "notToggledTransparency"
        }


        // splash screen itself.contains a sign in button, sign up button, a title and description and a google
        // authentication button.
        return <div className="SplashScreen">

            <div className="SplashScreenBackground">
            {error && <p>Error App: {error.message}</p>}

                {props.signUpMenuStatus && <SignUpMenu/>

                }


                {props.signInMenuStatus && <SignInMenu></SignInMenu>}

        <div className="titleAndSignInButtons">
            <div className="titleAndDescription">
                <div className="SplashScreenTitle" id={cssTransparencyID}>Todoiz.IO</div>
                <div className="SplashScreenDescription" id={cssTransparencyID}>The British Indian Ocean Territory note taking app
                    meant for you and your devices</div>
            </div>

            <div className="SplashScreenButtons" id={cssTransparencyID}>
                <button className="SplashScreenGoogle" onClick={() =>
                    auth.signInWithPopup(googleProvider)}>Sign in with Google now!
                </button>

                <button className="SplashScreenEmailSignUp" onClick={() =>
                    AppDataController.toggleSignUpMenu()}>Sign up with email and password!
                </button>
            </div>

            </div>
                <button className="SplashScreenEmailSignIn" id={cssTransparencyID} onClick={() =>
                    AppDataController.toggleSignInMenu()}>Already have an account? Sign in here with Email and Password
                </button>

        </div>
        </div>
    }
}

// function to handle signing in Contains an error message in case you aren't able to log in.

function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p className="ErrorMessage">Logging in…</p>
    }
    return <div>
        <button className="SignUpButton" onClick={() =>
            signInWithEmailAndPassword((document.getElementById('EmailValue').value), (document.getElementById('PasswordValue').value))}>Login!
        </button>
        {error && <p className="ErrorMessage">"Error logging in: " {error.message}</p>}
    </div>
}

// function to handle signing up. Contains an error message in case the user can't sign up.

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p className="ErrorMessage">Logging in…</p>
    }
    return <div>
        <button className="SignUpButton" onClick={() =>
            createUserWithEmailAndPassword((document.getElementById('EmailValue').value), (document.getElementById('PasswordValue').value))
        }>
            Sign up!
        </button>
        {error && <p className="ErrorMessage">"Error signing up: " {error.message}</p>}

    </div>
}



// contains the app once signed in.

function AppSignedIn(props) {
    AppDataController.setUserId(props.user.uid)
    AppDataController.setUserEmail(props.user.email)
    // gets different menu's status's from the redux state
    // Undo is not used at all.


    // lines 240 - 249 handle getting section data from firestore. lines 251-256 handle sorting it into user owned/shared.
    const sharedQuery = database.collection(collectionName).where('sharedWith', "array-contains", props.user.email);
    const [valueShared, loadingShared, errorShared] = useCollection(sharedQuery);


    let fireStoreList = null;
    let sharedFireStoreList = null;

    if (valueShared) {
        sharedFireStoreList = valueShared.docs.map((doc) => {
            return {...doc.data()}
        });
        sharedFireStoreList.sort(function(section1, section2) {
            let section1Owner = section1.owner === store.getState().userID;
            let section2Owner = section2.owner === store.getState().userID;
            return (section1Owner > section2Owner) ? -1 : (section1Owner < section2Owner) ? 1 : 0;
        });
    }
    // general layout for the app,
    // contains different menus disabled by the state by default.
    return (
        <div>
            <div class='hello'>
                <Header/>
                <SideBarBackground/>
                <div className="wideScreenDisplay">
                    <div className="Sidebar"><Sidebar sections={sharedFireStoreList}/></div>
                    <div className="Sidelist"><SideList sections={sharedFireStoreList}/></div>

                </div>
                <SectionList sections={sharedFireStoreList}/>
                {props.menuIsActive && <ActionMenu/>}
                {props.priorityMenuIsActive && <PriorityMenu/>}
                {props.shareMenuStatus && <ShareMenu/>}
                {props.removeMenuStatus && <RemoveSharedMenu/>}
                <ActionButton/>
            </div>
        </div>);
}


// Getting those stuffs from the state.
function mapToState(state) {

        return {
            removeMenuStatus: store.getState().showRemove,
            shareMenuStatus: store.getState().showShareMenu,
            signInMenuStatus: store.getState().showSignInMenu,
            signUpMenuStatus: store.getState().showSignUpMenu,
            menuIsActive: AppDataController.menuIsActive(),
            showUndo: AppDataController.undoIsActive(),
            priorityMenuIsActive: AppDataController.priorityMenuIsActive(),

        }
}

export default connect(mapToState)(App)

export {auth}