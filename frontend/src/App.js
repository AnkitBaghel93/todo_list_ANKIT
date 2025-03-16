import './App.css';
import Navbar from './components/Navbar/Navbar';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Home from  './components/home/home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Todo from './components/todo/Todo';


const  App = () => {
  return (
    <div >
      <Router>
              <Navbar/>

              <Routes>
                <Route exact path ='/' element ={ <Home/>}/>
                <Route  path ='/about' element ={ <About/>}/>
                <Route  path ='/todo' element ={ <Todo/>}/>
                <Route  path ='/signup' element ={ <Signup/>}/>
                <Route  path ='/signin' element ={ <Signin/>}/>
              </Routes>
      </Router>

      <Footer/>
    </div>
  );
}
export default App;

     
     
 
