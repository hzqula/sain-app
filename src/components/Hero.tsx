import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ClipboardList, MapPin, Users2 } from "lucide-react";
import { Badge } from "./ui/badge";

const Hero = () => {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-transparent"
    >
      <div className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-primary">KKN UIN Suska Riau 2025</Badge>
            <h1
              id="hero-title"
              className="text-3xl sm:text-5xl font-bold tracking-tight"
            >
              Desa Simpang Ayam
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-prose">
              KKN 2025 UIN Suska Riau pada tahun ini, membawa tema "
              <span className="font-semibold">
                Penguatan Masyarakat Berbasis Kearifan Lokal Menuju Indonesia
                Emas 2045.
              </span>
              "
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="#locations">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Lokasi
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="#members">
                  <Users2 className="h-4 w-4 mr-2" />
                  Anggota
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="#programs">
                  <MapPin className="h-4 w-4 mr-2" />
                  Program
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-tr from-emerald-100 to-transparent blur-2xl" />
            <img
              src="/placeholder.svg?height=560&width=900"
              alt="KKN students collaborating with local community"
              width={900}
              height={560}
              className="rounded-xl border object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
