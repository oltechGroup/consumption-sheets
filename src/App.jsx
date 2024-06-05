import Index from "./components/Index";
import StoreProvider from "./context/PartidasProvides";

function App() {
  return (
    <StoreProvider>
      <Index />
    </StoreProvider>
  );
}

export default App;
