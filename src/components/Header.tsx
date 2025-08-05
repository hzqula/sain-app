import { Button } from "./ui/button";
import { AiOutlineInstagram, AiOutlineTikTok } from "react-icons/ai";

const Header = () => {
  return (
    <header className="bg-white flex justify-center h-20 items-center sticky top-0 z-50 border-b border-primary">
      <div className="flex items-center justify-center w-2/5">
        <h1 className="font-heading text-primary font-black text-2xl">
          <a href="/">KKN Desa Simpang Ayam 25 USR</a>
        </h1>
      </div>
      <nav className="flex items-center justify-around w-4/5 h-auto">
        <ul className="flex justify-center gap-8 text-base font-semibold">
          <li>
            <Button className="textsec" variant="link">
              <a href="/">Beranda</a>
            </Button>
          </li>
          <li>
            <Button className="textsec" variant="link">
              <a href="/chatbot">Chatbot</a>
            </Button>
          </li>
          <li>
            <Button className="textsec" variant="link">
              <a href="">Al-Quran</a>
            </Button>
          </li>
        </ul>

        {/* Social Media */}
        <ul className="flex items-center justify-center gap-4 text-3xl">
          <li>
            <a
              target="_blank"
              href="https://instagram.com/kknsimpangayam25.usr"
            >
              <AiOutlineInstagram className="text-primary" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://tiktok.com/@kknsimpangayam25.usr">
              <AiOutlineTikTok className="text-primary" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
