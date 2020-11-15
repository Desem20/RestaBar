import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RestaBar from './components/RestaBar/RestaBar';
import OrderStatus from './components/OrderStatus/OrderStatus';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Plate from './components/Menu/Plate';
import Menu from './components/Menu/Menu';
import SeatMap from './components/SeatMap/SeatMap';
import About from './components/About/About';
import Home from './components/Home/Home';
import Finish from './components/DoneProgress/Finish';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar />
          <Switch>
            <Route path='/RestaBar' component={RestaBar} />
            <Route path='/OrderStatus' component={OrderStatus} />
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/Plate' component={Plate} />
            <Route path='/About' component={About} />
            <Route path='/Finish' component={Finish} />
            <Route path='/' component={Home} />
           

          </Switch>      
        </header>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
