import { useState, useEffect } from "react";
import {
  Filter,
  Search,
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal,
  MapPin,
  Bookmark,
  Star,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("listings").select(`
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

  const filteredListings = listings
    .filter((listing) => {
      if (
        searchTerm &&
        !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (
        condition !== "all" &&
        listing.condition.toLowerCase() !== condition.toLowerCase()
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

  const handleMessage = (listingId: string) => {
    navigate(`/contact/${listingId}`);
  };

  const handleMakeDeal = (listingId: string) => {
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
            extensive collection of listings.
          </p>
        </div>
      </section>

      {/* Filters section */}
      <section className="py-8 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 dark:text-indigo-300" />
              <Input
                type="text"
                placeholder="Search listings..."
                className="pl-10 border-indigo-200 dark:border-indigo-900 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="panels">Solar Panels</SelectItem>
                  <SelectItem value="batteries">Batteries</SelectItem>
                  <SelectItem value="inverters">Inverters</SelectItem>
                  <SelectItem value="systems">Complete Systems</SelectItem>
                </SelectContent>
              </Select>

              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like new">Like New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center rounded-md overflow-hidden shadow-sm dark:shadow-indigo-900/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-indigo-700 to-purple-700 text-white"
                      : "bg-white/80 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300"
                  } transition-all duration-200`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-indigo-700 to-purple-700 text-white"
                      : "bg-white/80 text-indigo-700 dark:bg-gray-800 dark:text-indigo-300"
                  } transition-all duration-200`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings section */}
      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-indigo-900 dark:text-indigo-200">
              Showing{" "}
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                {filteredListings.length}
              </span>{" "}
              results
              {condition !== "all" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    {condition}
                  </span>{" "}
                  condition
                </>
              )}
              {searchTerm && (
                <>
                  {" "}
                  matching "
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    {searchTerm}
                  </span>
                  "
                </>
              )}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="bg-white/80 dark:bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/50 text-center">
              <p className="text-xl text-indigo-800 dark:text-indigo-200 mb-6">
                No listings found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setCategory("all");
                  setCondition("all");
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Reset Filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="relative group transform transition-transform duration-200 hover:-translate-y-1"
                >
                  {listing.is_sponsored && (
                    <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-yellow-300 text-indigo-900 font-medium shadow-md">
                      Sponsored
                    </Badge>
                  )}
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 border border-indigo-100 dark:border-indigo-900/30">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={
                          listing.listing_images?.[0]?.image_url ||
                          "/placeholder.svg"
                        }
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-indigo-900 dark:text-indigo-100">
                        {listing.title}
                      </h3>
                      <div className="flex items-center mb-2 text-indigo-600 dark:text-indigo-300">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (listing.rating || 0)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="pt-4 border-t border-indigo-100 dark:border-indigo-800/30 mt-4 flex items-center justify-between">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400">
                          ${listing.price.toLocaleString()}
                        </span>
                        <Button
                          variant="outline"
                          className="border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors duration-200"
                        >
                          View Deal
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="relative group transform transition-transform duration-200 hover:-translate-y-1"
                >
                  {listing.is_sponsored && (
                    <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-yellow-300 text-indigo-900 font-medium shadow-md">
                      Sponsored
                    </Badge>
                  )}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-indigo-100 dark:border-indigo-900/30">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-56 relative overflow-hidden">
                        <img
                          src={
                            listing.listing_images?.[0]?.image_url ||
                            "/placeholder.svg"
                          }
                          alt={listing.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-xl mb-2 text-indigo-900 dark:text-indigo-100">
                            {listing.title}
                          </h3>
                          <div className="flex items-center mb-3 text-indigo-600 dark:text-indigo-300">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{listing.location}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < (listing.rating || 0)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                            {listing.condition} condition • Available now
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400">
                            ${listing.price.toLocaleString()}
                          </span>
                          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
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
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900/50 rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
              {selectedListing?.title}
            </DialogTitle>
            <DialogDescription className="text-indigo-700 dark:text-indigo-300">
              <div className="mt-4 space-y-6">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={
                      selectedListing?.listing_images?.[0]?.image_url ||
                      "/placeholder.svg"
                    }
                    alt={selectedListing?.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="space-y-3 text-gray-800 dark:text-gray-200">
                  <p className="flex justify-between border-b border-indigo-100 dark:border-indigo-800/30 pb-2">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                      Price:
                    </span>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400">
                      ${selectedListing?.price?.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-indigo-100 dark:border-indigo-800/30 pb-2">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                      Location:
                    </span>
                    <span>{selectedListing?.location}</span>
                  </p>
                  <p className="flex justify-between border-b border-indigo-100 dark:border-indigo-800/30 pb-2">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                      Condition:
                    </span>
                    <span className="capitalize">
                      {selectedListing?.condition}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-indigo-100 dark:border-indigo-800/30 pb-2">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                      Available Units:
                    </span>
                    <span>5</span>
                  </p>
                  <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <p className="text-sm text-indigo-800 dark:text-indigo-200">
                      This is a premium listing from a verified seller. The
                      product comes with a standard warranty and free
                      installation support.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => handleMessage(selectedListing.id)}
              className="flex-1 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors duration-200"
            >
              Message Seller
            </Button>
            <Button
              onClick={() => handleMakeDeal(selectedListing.id)}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
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
