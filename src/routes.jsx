import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import ContactList from "./components/ContactList";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/contacts" element={<ContactList />} />
      </Route>
    )
);