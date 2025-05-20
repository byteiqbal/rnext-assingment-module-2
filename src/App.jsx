import "./App.css";
import Nav from "./components/Nav";
import OrderSummery from "./components/OrderSummery";

function App() {
  return (
    <>
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Nav />
        <OrderSummery />
      </div>
    </>
  );
}

export default App;
