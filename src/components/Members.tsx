import { members } from "@/lib/kkn-data";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mail, Phone, University } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Members = () => {
  return (
    <section
      id="members"
      aria-labelledby="members-title"
      className="border-t scroll-mt-20"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              id="members-title"
              className="text-2xl sm:text-3xl font-semibold"
            >
              Anggota
            </h2>
            <p className="mt-2 text-muted-foreground">
              Prang-orang hebat di kelompok ini.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m) => (
            <Card key={m.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={m.avatar || "/placeholder.svg"}
                    alt={`Avatar of ${m.name}`}
                  />
                  <AvatarFallback>
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <University className="h-3 w-3" />
                    {m.major}
                  </Badge>
                  <Badge variant="outline">{m.university}</Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  {m.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" aria-hidden="true" />{" "}
                      <span>{m.email}</span>
                    </div>
                  )}
                  {m.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" aria-hidden="true" />{" "}
                      <span>{m.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
