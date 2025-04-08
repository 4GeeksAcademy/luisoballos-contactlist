import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import ContactCard from "./components/ContactCard";
import ContactList from "./components/ContactList";
import App from "./pages/App";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/contactcard-example" element={<ContactCard />} />
        <Route path= "/contacts" element={<ContactList />} />
      </Route>
    )
);