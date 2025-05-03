import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailModal from "@/components/ui/Explore/DetailModal";
import ListingSection from "@/components/ui/Explore/LsitingSection";
import FiltersSection from "@/components/ui/Explore/FiltersSection";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [condition, setCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loadedListings, setLoadedListings] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch all listings and paid deals
  const { data: allListings = [], isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      // Get all paid deals to identify sold listings
      const { data: dealsData } = await supabase
        .from("deals")
        .select("listing_id")
        .eq("status", "paid");

      const paidListingIds = dealsData?.map((deal) => deal.listing_id) || [];

      // Get all listings that are NOT in the paid deals list
      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          *,
          listing_images (id, image_url, is_primary),
          profiles:seller_id (first_name, last_name)
        `
        )
        .not("id", "in", `(${paidListingIds.join(",")})`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Filter and sort logic
  const getFilteredListings = () => {
    return allListings
      .filter((listing) => {
        if (searchTerm) {
          const titleMatch = String(listing.title)
            .toLowerCase()
            .includes(String(searchTerm).toLowerCase());
          const locationMatch = String(listing.location)
            .toLowerCase()
            .includes(String(searchTerm).toLowerCase());

          if (!titleMatch && !locationMatch) {
            return false;
          }
        }

        if (
          condition !== "all" &&
          String(listing.condition).toLowerCase() !== condition.toLowerCase()
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          default:
            return (
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        }
      });
  };

  // Pagination effect
  useEffect(() => {
    const filtered = getFilteredListings();
    const itemsPerLoad = page === 1 ? 150 : 100;
    const endIndex = Math.min(page * itemsPerLoad, filtered.length);
    
    setLoadedListings(filtered.slice(0, endIndex));
    setHasMore(endIndex < filtered.length);
  }, [page, allListings, searchTerm, condition, sortBy]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleViewDeal = (listing) => {
    navigate(`/listing/${listing.id}`);
  };

  const openDetailsModal = (listing) => {
    setSelectedListing(listing);
    setShowDetailsModal(true);
  };

  const handleMessage = (listingId) => {
    navigate(`/contact/${listingId}`);
  };

  const handleMakeDeal = (listingId) => {
    navigate(`/contact/${listingId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      {/* Header section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
            Explore Solar Listings
          </h1>
          <p className="text-lg text-blue-100">
            Find the perfect solar equipment for your needs. Browse through our
            extensive collection of unsold listings.
          </p>
        </div>
      </section>

      {/* Filters section */}
      <FiltersSection 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        condition={condition} 
        setCondition={setCondition} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
      />

      {/* Listings section */}
      <ListingSection
        filteredListings={loadedListings}
        viewMode={viewMode}
        isLoading={isLoading}
        condition={condition}
        setCondition={setCondition}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        openDetailsModal={openDetailsModal}
        handleViewDeal={handleViewDeal}
      />

      {/* Load More button */}
      {hasMore && !isLoading && (
        <div className="flex justify-center my-8">
          <Button 
            onClick={handleLoadMore}
            className="px-8 py-4 text-lg"
            variant="outline"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Details Modal */}
      <DetailModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        listing={selectedListing}
        onMessage={handleMessage}
        onMakeDeal={handleMakeDeal}
      />

      <Footer />
    </div>
  );
};

export default Explore;