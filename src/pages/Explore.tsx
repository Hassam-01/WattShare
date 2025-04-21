import { useState, useEffect } from "react";
import { Filter, Search, ChevronDown, Grid, List, SlidersHorizontal, MapPin, Bookmark, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          listing_images (
            id,
            image_url,
            is_primary
          ),
          profiles:seller_id (
            first_name,
            last_name
          )
        `);
      
      if (error) throw error;
      return data || [];
    },
  });

  const filteredListings = listings.filter((listing) => {
    if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (condition !== "all" && listing.condition.toLowerCase() !== condition.toLowerCase()) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleMessage = (listingId: string) => {
    navigate(`/contact/${listingId}`);
  };

  const handleMakeDeal = (listingId: string) => {
    navigate(`/contact/${listingId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header section */}
      <section className="bg-solar-darkblue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Solar Listings</h1>
          <p className="text-lg">
            Find the perfect solar equipment for your needs. Browse through our extensive collection of listings.
          </p>
        </div>
      </section>
      
      {/* Filters section */}
      <section className="py-6 bg-solar-lightgray dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search listings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="panels">Solar Panels</SelectItem>
                  <SelectItem value="batteries">Batteries</SelectItem>
                  <SelectItem value="inverters">Inverters</SelectItem>
                  <SelectItem value="systems">Complete Systems</SelectItem>
                </SelectContent>
              </Select>

              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like new">Like New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md overflow-hidden dark:border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid" 
                      ? "bg-primary text-white dark:bg-primary/80" 
                      : "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list" 
                      ? "bg-primary text-white dark:bg-primary/80" 
                      : "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Listings section */}
      <section className="py-8 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredListings.length}</span> results
              {condition !== "all" && (
                <> in <span className="font-semibold">{condition}</span> condition</>
              )}
              {searchTerm && (
                <> matching "<span className="font-semibold">{searchTerm}</span>"</>
              )}
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-xl text-gray-600 mb-4">
                No listings found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setCategory("all");
                  setCondition("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="relative">
                  {listing.is_sponsored && (
                    <Badge className="absolute top-4 left-4 z-10 bg-solar-yellow text-black">
                      Sponsored
                    </Badge>
                  )}
                  <ListingCard
                    id={listing.id}
                    title={listing.title}
                    price={listing.price}
                    location={listing.location}
                    image={listing.listing_images?.[0]?.image_url || '/placeholder.svg'}
                    condition={listing.condition}
                    rating={listing.rating || 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="relative">
                  {listing.is_sponsored && (
                    <Badge className="absolute top-4 left-4 z-10 bg-solar-yellow text-black">
                      Sponsored
                    </Badge>
                  )}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 relative">
                        <img
                          src={listing.listing_images?.[0]?.image_url || '/placeholder.svg'}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-1 text-gray-800">{listing.title}</h3>
                          <div className="flex items-center mb-2 text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{listing.location}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (listing.rating || 0) ? "text-solar-yellow fill-solar-yellow" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-solar-darkblue">
                            ${listing.price.toLocaleString()}
                          </span>
                          <Button variant="outline" className="border-solar-blue text-solar-blue hover:bg-solar-blue hover:text-white">
                            View Deal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedListing?.title}</DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-4">
                <img
                  src={selectedListing?.listing_images?.[0]?.image_url || '/placeholder.svg'}
                  alt={selectedListing?.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <p><span className="font-semibold">Price:</span> ${selectedListing?.price?.toLocaleString()}</p>
                  <p><span className="font-semibold">Location:</span> {selectedListing?.location}</p>
                  <p><span className="font-semibold">Condition:</span> {selectedListing?.condition}</p>
                  <p><span className="font-semibold">Available Units:</span> 5</p>
                  <p className="text-sm text-gray-600">
                    This is a premium listing from a verified seller. The product comes with a standard warranty and free installation support.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleMessage(selectedListing.id)}
              className="flex-1"
            >
              Message Seller
            </Button>
            <Button
              onClick={() => handleMakeDeal(selectedListing.id)}
              className="flex-1 bg-solar-blue hover:bg-solar-blue/90"
            >
              Make a Deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Explore;
