import { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError]  = useState("");
    const toggleAccount = () => setNewAccount((prev)  => ! prev);

    const onSocialClick = async (event) => {
        //console.log(event.target.name);
        const{
            target: {name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    
    const onChange = (event) => {
        //console.log(event.target.name);

        //로그인폼 상태 업데이트
        const {
            target : { name, value },
        } = event;
        if(name === "email"){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if (newAccount){
                //create new Account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                //login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(error){
            // console.log(error);
            setError(error.message);
        }
    };

    return (
        //login 기본구조만들기
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email" 
                    type="email" placeholder="Email" required
                    value={email}
                    onChange={onChange}
                    />
                <input 
                    name="password"
                    type="password" placeholder="Password" required
                    value={password}
                    onChange={onChange}
                    />
                <input type="submit" value={newAccount ? "Create Account" : "Login"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google</button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github</button>
            </div>
        </div>    
    );
};

export default Auth;