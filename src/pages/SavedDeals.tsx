import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ListingCard from "@/components/ListingCard";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const SavedDeals = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [savedListings, setSavedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedListings = async () => {
      if (!authState.user?.id) return;

      try {
        console.log("Fetching saved listings for user:", authState.user.id);
        const { data: saved, error: savedError } = await supabase
          .from("saved_listings")
          .select("listing_id")
          .eq("user_id", authState.user.id);

        if (savedError) throw savedError;
        console.log("Saved listings:", saved);

        const fullListings = [];

        for (const item of saved || []) {
          const listingId = item.listing_id;

          // Fetch listing details
          const { data: listing, error: listingError } = await supabase
            .from("listings")
            .select("*")
            .eq("id", listingId)
            .single();
          if (listingError) throw listingError;
          console.log("Listing data:", listing);

          // Fetch images
          const { data: images, error: imagesError } = await supabase
            .from("listing_images")
            .select("*")
            .eq("listing_id", listingId);
          if (imagesError) throw imagesError;
          console.log("Images:", images);

          // Fetch address
          // const { data: address, error: addressError } = await supabase
          //   .from("address")
          //   .select("*")
          //   .eq("id", listing.address_id)
          //   .single();
          // if (addressError) throw addressError;
          // console.log("Address:", address);

          // // Fetch city
          // const { data: city, error: cityError } = await supabase
          //   .from("city")
          //   .select("*")
          //   .eq("id", address.city_id)
          //   .single();
          // if (cityError) throw cityError;
          // console.log("City:", city);

          fullListings.push({
            id: listing.id,
            title: listing.title,
            price: listing.price,
            condition: listing.condition,
            rating: listing.rating,
            listing_images: images,
            // address: {
            //   address: address.address,
            //   city: {
            //     city_name: city.,
            //     province: city.province,
            //   },
            // },
          });
        }

        setSavedListings(fullListings);
      } catch (error) {
        console.error("Error fetching saved listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedListings();
  }, [authState.user?.id]);

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedListings.map((listing) => {
              const city = listing.address?.city?.city_name || "";
              const province = listing.address?.city?.province || "";
              const location = [city, province].filter(Boolean).join(", ");

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
