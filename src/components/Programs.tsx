import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Tag, Users } from "lucide-react";
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
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {owners.length === 1 ? (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Users className="h-3 w-3" />
                            {owners[0]?.name}
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Users className="h-3 w-3" />
                            {owners.length} Pelaksana
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {program.category}
                        </Badge>
                      </div>

                      {/* Show all owners if more than one */}
                      {owners.length > 1 && (
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Pelaksana: </span>
                          {owners.map((owner, index) => (
                            <span key={owner?.id}>
                              {owner?.name}
                              {index < owners.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{program.date}</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <span className="text-xs text-muted-foreground">
                          Status:
                        </span>
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
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {member.role} • {programs.length} program
                          {programs.length !== 1 ? "s" : ""}
                        </span>
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
                              <CardContent className="space-y-2 text-sm">
                                <div className="flex flex-wrap gap-2">
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Tag className="h-3 w-3" />
                                    {program.category}
                                  </Badge>
                                </div>

                                {/* Show collaborators if any */}
                                {otherOwners.length > 0 && (
                                  <div className="text-xs text-muted-foreground">
                                    <span className="font-medium">
                                      Bersama:{" "}
                                    </span>
                                    {otherOwners.map((owner, index) => (
                                      <span key={owner?.id}>
                                        {owner?.name}
                                        {index < otherOwners.length - 1
                                          ? ", "
                                          : ""}
                                      </span>
                                    ))}
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
