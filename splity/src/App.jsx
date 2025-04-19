// App.jsx or wherever you’re rendering <Hero />
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}

export default App;
