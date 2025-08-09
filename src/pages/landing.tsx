import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Members from "@/components/Members";
import Programs from "@/components/Programs";
const Landing = () => {
  return (
    <>
      <div className="min-h-[100dvh] flex flex-col scroll-smooth ">
        <Header />
        <main className="flex-1">
          <Hero />
          <Locations />
          {/* <About /> */}
          <Members />
          {/* <Gallery /> */}
          <Programs />
        </main>
      </div>
    </>
  );
};

export default Landing;
