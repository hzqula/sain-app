import { locations } from "@/lib/kkn-data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Badge } from "./ui/badge";

const Locations = () => {
  return (
    <section
      id="locations"
      aria-labelledby="locations-title"
      className="border-t scroll-mt-20"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 id="locations-title" className="text-2xl sm:text-3xl font-semibold">
          Lokasi KKN
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Kegiatan kami tersebar di semua dusun di Desa Simpang Ayam untuk
          memaksimalkan jangkauan dan dampak bagi masyarakat.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Card key={loc.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={loc.image || "/placeholder.svg"}
                  alt={`Location photo of ${loc.name}`}
                  width={640}
                  height={360}
                  className="w-full h-40 object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  {loc.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {loc.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Navigation className="h-3 w-3" />
                    {loc.coordinates}
                  </Badge>
                  <Badge variant="outline">{loc.address}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
