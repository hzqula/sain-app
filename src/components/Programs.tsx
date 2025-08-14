import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { members, programs } from "@/lib/kkn-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Programs = () => {
  const allPrograms = programs;

  // Helper function to get owners for a program
  const getProgramOwners = (ownerIds: string[]) => {
    return ownerIds
      .map((id) => members.find((m) => m.id === id))
      .filter(Boolean);
  };

  const programsByMember = members.map((member) => ({
    member,
    programs: allPrograms.filter((program) =>
      program.ownerIds.includes(member.id)
    ),
  }));

  return (
    <section
      id="programs"
      aria-labelledby="programs-title"
      className="border-t scroll-mt-20"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 id="programs-title" className="text-2xl sm:text-3xl font-semibold">
          Program Kerja
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Lihat setiap program kerja dari masing-masing anggota KKN Simpang Ayam
          25 USR. Setiap program memiliki kategori, tanggal pelaksanaan, dan
          status yang berbeda-beda.
        </p>

        <Tabs defaultValue="all" className="mt-8">
          <TabsList>
            <TabsTrigger value="all">Semua Program</TabsTrigger>
            <TabsTrigger value="by-member">Berdasarkan Pelaksana</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allPrograms.map((program) => {
                const owners = getProgramOwners(program.ownerIds);
                return (
                  <Card
                    key={program.id}
                    className="hover:shadow-sm transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      {/* Owner Profile Cards */}
                      <span className="text-xs font-medium text-muted-foreground">
                        Pelaksana:
                      </span>
                      <div className="flex gap-2">
                        {owners.map((owner) => (
                          <div
                            key={owner?.id}
                            className="flex items-center gap-3 py-2"
                          >
                            <img
                              src={owner?.avatar}
                              alt={owner?.name}
                              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">
                                {owner?.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {owner?.major}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2">
                        {program.categories.map((category, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{program.date}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                          <Badge
                            className={
                              program.status === "Akan Datang"
                                ? "bg-slate-700"
                                : program.status === "Sedang Berlangsung"
                                ? "bg-emerald-600"
                                : "bg-emerald-800"
                            }
                          >
                            {program.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="by-member" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {programsByMember
                .filter(({ programs }) => programs.length > 0) // Only show members with programs
                .map(({ member, programs }) => (
                  <AccordionItem key={member.id} value={member.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {member.role} • {programs.length} program
                            {programs.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program) => {
                          const owners = getProgramOwners(program.ownerIds);
                          const otherOwners = owners.filter(
                            (owner) => owner?.id !== member.id
                          );

                          return (
                            <Card key={program.id}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                  {program.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 text-sm">
                                {/* Display categories */}
                                <div className="flex flex-wrap gap-2">
                                  {program.categories.map((category, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="flex items-center gap-1"
                                    >
                                      <Tag className="h-3 w-3" />
                                      {category}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Show collaborators if any */}
                                {otherOwners.length > 0 && (
                                  <div>
                                    <span className="text-xs font-medium text-muted-foreground mb-2 block">
                                      Kolaborasi dengan:
                                    </span>
                                    <div className="space-y-2">
                                      {otherOwners.map((owner) => (
                                        <div
                                          key={owner?.id}
                                          className="flex items-center gap-3 p-2 rounded-lg border bg-muted/30"
                                        >
                                          <img
                                            src={owner?.avatar}
                                            alt={owner?.name}
                                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium truncate">
                                              {owner?.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                              {owner?.major}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{program.date}</span>
                                </div>

                                <Badge
                                  className={
                                    program.status === "Akan Datang"
                                      ? "bg-slate-700"
                                      : program.status === "Sedang Berlangsung"
                                      ? "bg-emerald-600"
                                      : "bg-emerald-800"
                                  }
                                >
                                  {program.status}
                                </Badge>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>

            {/* Show members without programs */}
            {programsByMember.some(({ programs }) => programs.length === 0) && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">
                  Anggota belum memiliki program:
                </h4>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {programsByMember
                    .filter(({ programs }) => programs.length === 0)
                    .map(({ member }, index, array) => (
                      <span key={member.id}>
                        {member.name}
                        {index < array.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Programs;
