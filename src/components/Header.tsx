import { useState } from "react";
import { Button } from "./ui/button";
import { AiOutlineInstagram, AiOutlineTikTok } from "react-icons/ai";
import logo from "../assets/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white flex justify-center h-20 items-center sticky top-0 z-50 border-b border-primary">
      <div className="ml-4 md:ml-4 flex gap-4 items-center justify-center w-3/5 md:w-2/5">
        <img src={logo} alt="" className="w-12 h-12" />
        <h1 className="font-heading text-primary font-black text-base md:text-2xl ">
          <a href="/">KKN Desa Simpang Ayam 25 USR</a>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-around w-4/5 h-auto">
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
              <a href="/al-quran">Al-Quran</a>
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

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center ml-auto mr-4">
        <button
          onClick={toggleMenu}
          className="text-primary focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-primary shadow-md z-40">
          <nav className="flex flex-col items-center py-4">
            <ul className="flex flex-col items-center gap-4 text-base font-semibold mb-4">
              <li>
                <Button className="textsec" variant="link">
                  <a href="/" onClick={() => setIsMenuOpen(false)}>
                    Beranda
                  </a>
                </Button>
              </li>
              <li>
                <Button className="textsec" variant="link">
                  <a href="/chatbot" onClick={() => setIsMenuOpen(false)}>
                    Chatbot
                  </a>
                </Button>
              </li>
              <li>
                <Button className="textsec" variant="link">
                  <a href="/al-quran" onClick={() => setIsMenuOpen(false)}>
                    Al-Quran
                  </a>
                </Button>
              </li>
            </ul>
            {/* Mobile Social Media */}
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
                <a
                  target="_blank"
                  href="https://tiktok.com/@kknsimpangayam25.usr"
                >
                  <AiOutlineTikTok className="text-primary" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
