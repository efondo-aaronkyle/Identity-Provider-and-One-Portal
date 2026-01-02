import { act, useEffect, useState } from "react";
import OnePortalLayout from "../layouts/OnePortalLayout";
import PortalHero from "../components/PortalHero";
import PortalToolbar from "../components/PortalToolbar";
import SystemGrid from "../components/SystemGrid";
import Pagination from "../components/Pagination";
import { systems } from "../data/systems";

export default function OnePortalHome() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 6;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory]);

    return (
        <OnePortalLayout>
            <PortalHero />
            <main className="p-10 pt-24">
                <PortalToolbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                <SystemGrid 
                    searchQuery={searchQuery}
                    activeCategory={activeCategory} 
                    currentPage={currentPage}
                    cardsPerPage={CARDS_PER_PAGE}
                />

                <Pagination 
                    totalPages={Math.ceil(
                        systems.filter((system) =>
                            (activeCategory === "All" || system.category === activeCategory) &&
                            system.title.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length / CARDS_PER_PAGE
                    )}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </main>
        </OnePortalLayout>
    );
}