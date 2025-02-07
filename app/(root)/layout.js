import Navbar from "../../components/ui/Navbar";

export default function Layout({ children }) {
    return (
        <main>
            <Navbar />
            {children}
        </main>

    )
}