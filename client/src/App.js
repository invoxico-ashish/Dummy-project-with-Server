import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import OurTeam from "./components/Team/OurTeam";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar/Navbar";
import GetInTouch from "./components/GetInTouch/GetInTouch";
import AdminHome from "./components/admin/AdminHome";
import Dashboard from "./components/admin/Dashboard";
import AdminPortfolio from "./components/admin/AdminPortfolio";
import AdminSlider from "./components/admin/AdminSlider";
import AdminTeam from "./components/admin/AdminTeam";
import AddNewAdmin from "./components/admin/AddNewAdmin";
import UpdateAdmin from "./components/admin/UpdateAdmin";
import AddPortfolio from "./components/admin/AddPortfolio";
import AddSlide from "./components/admin/AddSlide";
import UpdateSlides from "./components/admin/UpdateSlides";
import AddTeam from "./components/admin/AddTeam";
import UpdateTeam from "./components/admin/UpdateTeam";
import Protected from "./components/admin/Protected";
import UpdatePortfolio from "./components/admin/UpdatePortfolio";
import UserList from "./components/admin/UserList";
import Missing from "./components/Missing";
import AdminNavbar from "./components/admin/AdminNavbar";
import Permissions from "./components/admin/Permissions";
import "./components/Header/Navbar/Navbar.css"
function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Footer />}>
            <Route element={<Navbar />}>
              <Route element={<GetInTouch />}>
                <Route>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/team" element={<OurTeam />} />
                 
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={ <Missing />} />
          {/* ADMIN-ROUTES-------------------------------------------------------------> */}
          <Route  element={<AdminNavbar/>}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/dashboard"element={<Protected><Dashboard /></Protected>}/>
          <Route path="/adminport"element={<Protected><AdminPortfolio /></Protected>}/>
          <Route path="/slideradmin"element={<Protected><AdminSlider /></Protected>}/>
          <Route path="/teamadmin"element={<Protected><AdminTeam /></Protected>}/>
          <Route path="/newadmin"element={<Protected><AddNewAdmin /></Protected>}/>
          <Route path="/updateadmin/:id"element={<Protected><UpdateAdmin /> </Protected>}/>
          <Route path="/addport"element={<Protected><AddPortfolio /></Protected>}/>
          <Route path="/addslides"element={<Protected><AddSlide /></Protected>}/>
          <Route path="/updateslides/:id"element={<Protected><UpdateSlides /></Protected> }/>
          <Route path="/addteam" element={<Protected><AddTeam /></Protected> } />
          <Route path="/updateteam/:id"element={ <Protected><UpdateTeam /></Protected> }/>
          <Route path="/updateport/:id"element={ <Protected><UpdatePortfolio /> </Protected>} />
          <Route path="/userlist" element={<Protected><UserList /></Protected> } />
          <Route path="/permission/:id" element={<Protected><Permissions /></Protected> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
