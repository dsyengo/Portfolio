import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Achievements from './components/Achievements';

const App = () => (
  <div className="font-sans">
    <Header />
    <main>
      <Hero/>
      <Skills />
      <Achievements/>
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default App;
