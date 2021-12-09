import "./css/global.css"
import "./css/splashScreen.css"
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

import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';
import store from "./modules/dataController/store";
import SignUpMenu from "./modules/dataController/signUpMenu";

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function verifyEmail() {
    auth.currentUser.sendEmailVerification();
}


function App(props) {
    const [user, loading, error] = useAuthState(auth);



    function SignUpMenu(){
        return(
            <div>
            <div className="SignUpTitle">Let's Get Started!</div>
        <div className="SplashScreenBlurredBackground"
                  onClick={() => AppDataController.toggleSignUpMenu()}></div>
                <div className="SignUpTitleDescription">
                    We'll send you an email to confirm your account
                </div>
                <input type="email" placeholder="Your email" className="EmailInput" id="EmailValue"/>
                <div className="SignUpPasswordDescription">
                                              Remember to choose a secure password
                                          </div>
                <input type="password" placeholder="Your password" className="EmailInput" id="PasswordValue"/>
                <SignUp></SignUp>
            </div>)

    }

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




    if (loading) {
        return <p>Checking...</p>;

    } else if (user) {
        return <div>
            {/*{user.displayName || user.email}*/}
            <AppSignedIn {...props} user={user}/>
            <button type="button" onClick={() => auth.signOut()}>Logout</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    }

    // else if (props.signUpMenuStatus){
    //     return(<SignUp classname="SplashScreenSignUp" key="Sign Up"/>)
    // }
    //
    // else if (props.signInMenuStatus){
    //     return (<SignIn classname="SplashScreenSignIn" key="Sign In"/>)
    // }



    else {
        let cssTransparencyID
        if(props.signInMenuStatus || props.signUpMenuStatus){
            cssTransparencyID = "toggledTransparency"
        }
        else{
            cssTransparencyID = "notToggledTransparency"
        }

        return <div className="SplashScreen">

            <div className="SplashScreenBackground">
            {error && <p>Error App: {error.message}</p>}

                {props.signUpMenuStatus && <SignUpMenu/>

                }


                {props.signInMenuStatus && <SignInMenu></SignInMenu>}



            <div className="SplashScreenTitle" id={cssTransparencyID}>Todoiz.IO</div>
            <div className="SplashScreenDescription" id={cssTransparencyID}>The British Indian Ocean Territory note taking app
                meant for you and your devices</div>

            <div className="SplashScreenButtons" id={cssTransparencyID}>
                <button className="SplashScreenGoogle" onClick={() =>
                    auth.signInWithPopup(googleProvider)}>Sign in with Google now!
                </button>

                <button className="SplashScreenEmailSignUp" onClick={() =>
                    AppDataController.toggleSignUpMenu()}>Sign up with email and password!
                </button>

                <button className="SplashScreenEmailSignIn" onClick={() =>
                    AppDataController.toggleSignInMenu()}>Already have an account? Sign in here with Email and Password
                </button>
            </div>
        </div>
        </div>
    }
}


const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';


function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
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

{/*<SignIn classname="SplashScreenSignIn" key="Sign In"/>*/}
{/*<SignUp classname="SplashScreenSignUp" key="Sign Up"/>*/}

{/*<button alt="GoogleSignInButton"*/}
{/*    onClick={() => auth.signInWithPopup(googleProvider)}>Login with Google*/}
{/*    text = "Sign in with Google now!"*/}
{/*    />*/}










//{menuIsActive, priorityMenuIsActive}


function AppSignedIn(props) {
    AppDataController.setUserId(props.user.uid)
    // gets different menu's status's from the redux state
    // Undo is not used at all.


    // Get the sections information from firestore
    const query = database.collection(collectionName).where('owner', "==", props.user.uid);
    const [value, loading, error] = useCollection(query);
    let fireStoreList = null;
    if (value) {
        fireStoreList = value.docs.map((doc) => {
            return {...doc.data()}});

    }


// Returns both a widescreen format for tablets/desktops/landscape mode and a portrait mode
    // depending on screen orientation.
  return (
    <div class='hello'>
      <Header/>
      <SideBarBackground/>
        <div className="wideScreenDisplay">
            <div className="Sidebar"><Sidebar sections = {fireStoreList}/></div>
            <div className="Sidelist"><SideList sections = {fireStoreList}/></div>

        </div>
        <SectionList sections = {fireStoreList}/>
      { props.menuIsActive && <ActionMenu/> }
        { props.priorityMenuIsActive && <PriorityMenu/>}
      <ActionButton/>
    </div>
  );
}

// Getting those stuffs.
function mapToState(state) {

        return {
            signInMenuStatus: store.getState().showSignInMenu,
            signUpMenuStatus: store.getState().showSignUpMenu,
            menuIsActive: AppDataController.menuIsActive(),
            showUndo: AppDataController.undoIsActive(),
            priorityMenuIsActive: AppDataController.priorityMenuIsActive(),

        }
}

export default connect(mapToState)(App)