import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import  { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  //setInterval(() => console.log(authService.currentUser), 2000); //코드 실행후 2초마다 authService.currentUser의 값을 출력

  //console.log(authService.currentUser);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy;{new Date().getFullYear()} Hwitter</footer>
    </>
  );
}

export default App;
