import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { ContactList } from "../components/ContactList.jsx";
import { App } from "../pages/App.jsx";

export const Layout = () => {
    return (
        <div className="container mx-auto">
            <Navbar />
            <App />
            <Footer />
        </div>
    )
}