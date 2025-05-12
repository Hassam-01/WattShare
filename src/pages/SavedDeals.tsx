import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ListingCard from "@/components/ListingCard";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const SavedDeals = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    // Only fetch data if we have a logged in user
    if (authState.user?.id) {
      fetchSavedListings();
    }
  }, [authState.user?.id]);

  const fetchSavedListings = async () => {
    try {
      // First get all the listing IDs this user has saved
      const { data: saved, error: savedError } = await supabase
        .from("saved_listings")
        .select("listing_id")
        .eq("user_id", authState.user.id);

      if (savedError) throw savedError;
      
      // Collect full listing details for each saved item
      const fullListings = [];

      for (const item of saved || []) {
        const listingId = item.listing_id;

        // Get main listing info
        const { data: listing, error: listingError } = await supabase
          .from("listings")
          .select("*")
          .eq("id", listingId)
          .single();
        if (listingError) throw listingError;

        // Get listing images
        const { data: images, error: imagesError } = await supabase
          .from("listing_images")
          .select("*")
          .eq("listing_id", listingId);
        if (imagesError) throw imagesError;

        // Add the complete data to our array
        fullListings.push({
          id: listing.id,
          title: listing.title,
          price: listing.price,
          condition: listing.condition,
          rating: listing.rating,
          listing_images: images,
          // The address lookup is commented out in original code
          // but we keep the structure for the location display below
        });
      }

      setSavedListings(fullListings);
    } catch (error) {
      console.error("Error fetching saved listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(savedListings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedListings.slice(indexOfFirstItem, indexOfLastItem);

  // Page navigation handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saved Deals</h1>

        {savedListings && savedListings.length > 0 ? (
          <>
            {/* Grid of listing cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {currentItems.map((listing) => {
                // Format location string from available data
                const city = listing.address?.city?.city_name || "";
                const province = listing.address?.city?.province || "";
                const location = [city, province].filter(Boolean).join(", ");

                // Find primary image or fall back to first available
                const primaryImage =
                  listing.listing_images?.find((img) => img.is_primary) ||
                  listing.listing_images?.[0] ||
                  null;

                return (
                  <ListingCard
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    price={listing.price}
                    location={location}
                    image={primaryImage?.image_url || "/placeholder.svg"}
                    condition={listing.condition}
                    rating={listing.rating || 0}
                    isSaved={true}
                  />
                );
              })}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToFirstPage} 
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm mx-4">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToLastPage} 
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="text-center p-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p>You don't have any saved deals yet.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate("/explore")}
              >
                Explore Products
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SavedDeals;