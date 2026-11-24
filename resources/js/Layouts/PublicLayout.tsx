import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ScrollToTop from "@/Components/ScrollToTop";
import { Head } from "@inertiajs/react";

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title = "AQEYO House & Social Space" }: PublicLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <ScrollToTop />
            </div>
        </>
    );
}
