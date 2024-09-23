import { useState, useEffect, Fragment } from "react";
// import Navbar from "./layout/Navbar";
// import Map from "./components/leaflet/Basic";

function App() {
  const [isSignin, setIsSignin] = useState(true);
  const handleIsSignin = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsSignin(true);
    } else {
      setIsSignin(false);
    }
  };

  useEffect(() => {
    handleIsSignin();
  }, []);

  return (
    <Fragment>
      {/* <Navbar isSignin={isSignin} /> */}
        {/* <Map></Map> */}
        <h1>test</h1>
    </Fragment>
  );
}

export default App
