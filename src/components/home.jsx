import React from 'react';
import logo from '../assets/f1_logo.svg';
import newmobebg1 from '../assets/newmobebg1.jpg'

const Home = () => {
  return (
    <div class="bg-[url('/.public/undercutLogo.jpeg')]">
     <div id="home" className="flex items-center justify-center h-screen" style={{ backgroundImage: `url(${newmobebg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className=" text-4xl md:text-6xl lg:text-8xl font-bold text-white bg-transparent  p-10 ">
        <div className="flex flex-col md:flex-row items-center">
          <img src={logo} alt="icon" className="h-16 md:h-20 lg:h-24 mb-8 md:mb-0 md:mr-4" />
          <span className="text-red-600 italic">UNDERCUT PIT</span>
        </div>
      </h1>
    </div>
    </div>
  );
};

export default Home;
