import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailModal from "@/components/ui/Explore/DetailModal";
import ListingSection from "@/components/ui/Explore/LsitingSection";
import FiltersSection from "@/components/ui/Explore/FiltersSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const ITEMS_PER_PAGE = 25;

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [condition, setCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Function to get filtered paid listing IDs
  const getFilteredPaidListingIds = async () => {
    const { data: dealsData } = await supabase
      .from("deals")
      .select("listing_id")
      .eq("status", "paid");

    return dealsData?.map((deal) => deal.listing_id) || [];
  };

  // Function to get the total count of filtered listings
  const fetchTotalCount = async () => {
    const paidListingIds = await getFilteredPaidListingIds();
  
    let countQuery = supabase.from("listings").select("id", { count: "exact" });
  
    // Exclude paid listings only if there are any
    if (paidListingIds.length > 0) {
      countQuery = countQuery.not("id", "in", `(${paidListingIds.join(",")})`);
    }
  
    // Apply filters
    if (searchTerm) {
      countQuery = countQuery.or(
        `title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`
      );
    }
  
    if (condition !== "all") {
      countQuery = countQuery.ilike("condition", condition);
    }
  
    const { count, error } = await countQuery;
  
    if (error) throw error;
    return count || 0;
  };

  // Separate query for the total count
  const { data: totalCount = 0, refetch: refetchCount } = useQuery({
    queryKey: ["listingsCount", searchTerm, condition],
    queryFn: fetchTotalCount,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to fetch paginated listings from Supabase
  const fetchListings = async () => {
    const paidListingIds = await getFilteredPaidListingIds();
    
    // Calculate range for current page
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;
  
    let query = supabase
      .from("listings")
      .select(
        `
        *,
        listing_images (id, image_url, is_primary),
        profiles:seller_id (first_name, last_name)
      `
      )
      .range(start, end);
  
    // Exclude paid listings only if there are any
    if (paidListingIds.length > 0) {
      query = query.not("id", "in", `(${paidListingIds.join(",")})`);
    }
  
    // Apply filters
    if (searchTerm) {
      query = query.or(
        `title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`
      );
    }
  
    if (condition !== "all") {
      query = query.ilike("condition", condition);
    }
  
    // Apply sorting
    switch (sortBy) {
      case "price_low":
        query = query.order("price", { ascending: true });
        break;
      case "price_high":
        query = query.order("price", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }
  
    const { data, error } = await query;
  
    if (error) throw error;
    return data || [];
  };
  
  // Use React Query for data fetching
  const {
    data: listings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["listings", searchTerm, condition, sortBy, currentPage],
    queryFn: fetchListings,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, condition, sortBy]);

  // Refetch when necessary
  useEffect(() => {
    refetch();
    refetchCount();
  }, [searchTerm, condition, sortBy, currentPage, refetch, refetchCount]);

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

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Navigate to specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to render pagination numbers
  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    // Logic to show appropriate page numbers
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 0) {
      pageNumbers.push(
        <Button 
          key="first" 
          variant={0 === currentPage ? "default" : "outline"}
          className="px-3 mx-1"
          onClick={() => goToPage(0)}
        >
          1
        </Button>
      );
      
      // Ellipsis if needed
      if (startPage > 1) {
        pageNumbers.push(
          <span key="ellipsis1" className="px-2">...</span>
        );
      }
    }
    
    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      if (i === 0 && startPage === 0) continue; // Skip first page if already shown
      if (i === totalPages - 1 && endPage === totalPages - 1) continue; // Skip last page if will be shown
      
      pageNumbers.push(
        <Button 
          key={i} 
          variant={i === currentPage ? "default" : "outline"}
          className="px-3 mx-1"
          onClick={() => goToPage(i)}
        >
          {i + 1}
        </Button>
      );
    }
    
    // Last page
    if (endPage < totalPages - 1) {
      // Ellipsis if needed
      if (endPage < totalPages - 2) {
        pageNumbers.push(
          <span key="ellipsis2" className="px-2">...</span>
        );
      }
      
      pageNumbers.push(
        <Button 
          key="last" 
          variant={totalPages - 1 === currentPage ? "default" : "outline"}
          className="px-3 mx-1"
          onClick={() => goToPage(totalPages - 1)}
        >
          {totalPages}
        </Button>
      );
    }
    
    return pageNumbers;
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
        filteredListings={listings}
        totalCount={totalCount}
        viewMode={viewMode}
        isLoading={isLoading}
        condition={condition}
        setCondition={setCondition}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        openDetailsModal={openDetailsModal}
        handleViewDeal={handleViewDeal}
      />

      {/* Pagination controls */}
      {totalCount > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 my-8 px-4">
          <Button
            onClick={() => goToPage(0)}
            disabled={currentPage === 0}
            variant="outline"
            className="flex items-center"
            title="First Page"
          >
            <ChevronsLeft className="h-4 w-4 mr-1" />
            First
          </Button>
          
          <Button
            onClick={() => goToPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center mx-2">
            {renderPaginationNumbers()}
          </div>
          
          <Button
            onClick={() => goToPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            variant="outline"
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          
          <Button
            onClick={() => goToPage(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
            variant="outline"
            className="flex items-center"
            title="Last Page"
          >
            Last
            <ChevronsRight className="h-4 w-4 ml-1" />
          </Button>
          
          <div className="w-full text-center mt-2 text-sm text-gray-500">
            Showing page {currentPage + 1} of {totalPages || 1} ({totalCount} listings)
          </div>
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