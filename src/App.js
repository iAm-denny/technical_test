import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { ItemContext } from "./Context/ItemContext";
import { routes } from "./routes";

function App() {
  const [items, setItems] = useState([]);
  return (
    <ItemContext.Provider value={{ items, setItems }}>
      <Navigation>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              exact={route.exact}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Navigation>
    </ItemContext.Provider>
  );
}

export default App;
