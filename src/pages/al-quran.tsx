import React, { useState, useEffect } from "react";
import {
  Search,
  Play,
  Pause,
  Volume2,
  BookOpen,
  MapPin,
  Hash,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
  ayat: Ayat[];
  suratSelanjutnya:
    | {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
      }
    | false;
  suratSebelumnya:
    | {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
      }
    | false;
}

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

interface ApiResponse {
  code: number;
  message: string;
  data: Surah[];
}

interface SurahDetailResponse {
  code: number;
  message: string;
  data: SurahDetail;
}

const qariList = [
  { id: "01", name: "Abdullah Al-Juhany" },
  { id: "02", name: "Abdul Muhsin Al-Qasim" },
  { id: "03", name: "Abdurrahman as-Sudais" },
  { id: "04", name: "Ibrahim Al-Dossari" },
  { id: "05", name: "Misyari Rasyid Al-Afasi" },
];

const AlQuranApp: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const [selectedQari, setSelectedQari] = useState("05");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    const filtered = surahs.filter(
      (surah) =>
        surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.nama.includes(searchTerm) ||
        surah.arti.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSurahs(filtered);
  }, [searchTerm, surahs]);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://equran.id/api/v2/surat");
      const data: ApiResponse = await response.json();

      if (data.code === 200) {
        setSurahs(data.data);
        setFilteredSurahs(data.data);
      } else {
        setError("Gagal memuat data Al-Quran");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  const fetchSurahDetail = async (surahNumber: number) => {
    try {
      setLoadingSurah(true);
      const response = await fetch(
        `https://equran.id/api/v2/surat/${surahNumber}`
      );
      const data: SurahDetailResponse = await response.json();

      if (data.code === 200) {
        setSelectedSurah(data.data);
        setSidebarOpen(false);
      } else {
        setError("Gagal memuat detail surah");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat detail surah");
    } finally {
      setLoadingSurah(false);
    }
  };

  const playAyatAudio = (ayat: Ayat) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    if (playingAyat === ayat.nomorAyat && isPlaying) {
      setIsPlaying(false);
      setPlayingAyat(null);
      return;
    }

    const audio = new Audio(ayat.audio[selectedQari]);
    audio.play();

    audio.onended = () => {
      if (autoPlay && selectedSurah) {
        const currentIndex = selectedSurah.ayat.findIndex(
          (a) => a.nomorAyat === ayat.nomorAyat
        );
        const nextAyat = selectedSurah.ayat[currentIndex + 1];

        if (nextAyat) {
          // Play next ayat automatically
          setTimeout(() => {
            playAyatAudio(nextAyat);
          }, 500); // Small delay before next ayat
        } else {
          // End of surah
          setIsPlaying(false);
          setPlayingAyat(null);
        }
      } else {
        setIsPlaying(false);
        setPlayingAyat(null);
      }
    };

    setCurrentAudio(audio);
    setIsPlaying(true);
    setPlayingAyat(ayat.nomorAyat);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      setPlayingAyat(null);
    }
  };

  const handleSurahClick = (surahNumber: number) => {
    stopAudio();
    fetchSurahDetail(surahNumber);
  };

  const goToSurah = (surahNumber: number) => {
    stopAudio();
    fetchSurahDetail(surahNumber);
  };

  const SurahList: React.FC = () => (
    <div className="space-y-2">
      {filteredSurahs.map((surah) => (
        <div
          key={surah.nomor}
          onClick={() => handleSurahClick(surah.nomor)}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedSurah?.nomor === surah.nomor
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                selectedSurah?.nomor === surah.nomor
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {surah.nomor}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{surah.namaLatin}</p>
              <p className="text-sm opacity-70 truncate">{surah.arti}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-arabic">{surah.nama}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const AyatCard: React.FC<{ ayat: Ayat }> = ({ ayat }) => (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
          {ayat.nomorAyat}
        </div>
        <Button
          onClick={() => playAyatAudio(ayat)}
          className="bg-secondary hover:bg-secondary/80"
        >
          {playingAyat === ayat.nomorAyat && isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <Volume2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="text-right">
          <p className="text-3xl font-arabic text-primary leading-loose">
            {ayat.teksArab}
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-foreground leading-relaxed">
            {ayat.teksIndonesia}
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[90vh] bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Memuat Al-Quran...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[90vh] bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button
            onClick={fetchSurahs}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  // Main layout with sidebar
  return (
    <>
      <Header />
      <div className="h-[90vh] bg-background flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
        >
          {/* Sidebar Header - Fixed */}
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-primary">
                Daftar Surah
              </h2>
              <Button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Search in Sidebar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Cari surah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Surah List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <SurahList />
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-[90vh] overflow-hidden">
          {/* Top Header - Fixed */}
          <header className="bg-card border-b border-border flex-shrink-0 z-30">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                  <div>
                    <h1 className="font-heading text-2xl font-bold text-primary">
                      Al-Quran Digital
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      القرآن الكريم
                    </p>
                  </div>
                </div>

                {/* Controls */}
                {selectedSurah && (
                  <div className="flex items-center gap-4">
                    {/* Auto Play Toggle */}
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoPlay}
                          onChange={(e) => setAutoPlay(e.target.checked)}
                          className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-muted-foreground">
                          Putar Otomatis
                        </span>
                      </label>
                    </div>

                    {/* Qari Selector */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Qari:
                      </label>
                      <select
                        value={selectedQari}
                        onChange={(e) => {
                          stopAudio();
                          setSelectedQari(e.target.value);
                        }}
                        className="px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                      >
                        {qariList.map((qari) => (
                          <option key={qari.id} value={qari.id}>
                            {qari.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Audio Control Bar - Fixed */}
          {isPlaying && selectedSurah && (
            <div className="bg-primary text-primary-foreground p-3 flex-shrink-0 z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Memutar: {selectedSurah.namaLatin} - Ayat {playingAyat}
                    {autoPlay && (
                      <span className="ml-2 text-xs opacity-75">
                        (Auto Play)
                      </span>
                    )}
                  </span>
                </div>
                <Button
                  onClick={stopAudio}
                  className="px-3 py-1 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded transition-colors text-sm"
                >
                  Stop
                </Button>
              </div>
            </div>
          )}

          {/* Main Content Area - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4">
              {!selectedSurah ? (
                /* Welcome Screen */
                <div className="max-w-4xl mx-auto text-center py-12">
                  <div className="mb-8">
                    <h1 className="font-heading text-5xl font-bold text-primary mb-4">
                      Al-Quran Digital
                    </h1>
                    <p className="text-xl text-muted-foreground mb-2">
                      القرآن الكريم
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="bg-card border border-secondary rounded-lg p-6">
                      <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">114 Surah</h3>
                      <p className="text-sm text-muted-foreground">
                        Lengkap dengan terjemahan Indonesia
                      </p>
                    </div>
                    <div className="bg-card border border-secondary rounded-lg p-6">
                      <Volume2 className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Audio Tilawah</h3>
                      <p className="text-sm text-muted-foreground">
                        5 pilihan qari terbaik
                      </p>
                    </div>
                    <div className="bg-card border border-secondary rounded-lg p-6">
                      <Search className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Pencarian Mudah</h3>
                      <p className="text-sm text-muted-foreground">
                        Cari surah berdasarkan nama atau arti
                      </p>
                    </div>
                  </div>
                </div>
              ) : loadingSurah ? (
                /* Loading Surah */
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground">Memuat surah...</p>
                  </div>
                </div>
              ) : (
                /* Surah Content */
                <div className="max-w-4xl mx-auto">
                  {/* Surah Header */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-border rounded-xl p-8 mb-8">
                    <div className="text-center">
                      <h1 className="font-heading text-4xl font-bold text-primary mb-2">
                        {selectedSurah.namaLatin}
                      </h1>
                      <p className="text-5xl font-arabic text-primary mb-4">
                        {selectedSurah.nama}
                      </p>
                      <p className="text-xl text-muted-foreground mb-6">
                        {selectedSurah.arti}
                      </p>

                      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>Surah ke-{selectedSurah.nomor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Hash className="w-4 h-4" />
                          <span>{selectedSurah.jumlahAyat} ayat</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedSurah.tempatTurun}</span>
                        </div>
                      </div>

                      <div className="bg-card/50 rounded-lg p-4">
                        <p
                          className="text-muted-foreground leading-relaxed text-justify"
                          dangerouslySetInnerHTML={{
                            __html: selectedSurah.deskripsi,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mb-8">
                    <Button
                      onClick={() =>
                        selectedSurah.suratSebelumnya &&
                        goToSurah(selectedSurah.suratSebelumnya.nomor)
                      }
                      disabled={!selectedSurah.suratSebelumnya}
                      className="bg-secondary hover:bg-secondary/80"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {selectedSurah.suratSebelumnya
                        ? selectedSurah.suratSebelumnya.namaLatin
                        : "Surah Sebelumnya"}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {selectedSurah.ayat.length} Ayat
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        selectedSurah.suratSelanjutnya &&
                        goToSurah(selectedSurah.suratSelanjutnya.nomor)
                      }
                      disabled={!selectedSurah.suratSelanjutnya}
                      className="bg-secondary hover:bg-secondary/80"
                    >
                      {selectedSurah.suratSelanjutnya
                        ? selectedSurah.suratSelanjutnya.namaLatin
                        : "Surah Selanjutnya"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Ayat List */}
                  <div>
                    {selectedSurah.ayat.map((ayat) => (
                      <AyatCard key={ayat.nomorAyat} ayat={ayat} />
                    ))}
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
                    <Button
                      onClick={() =>
                        selectedSurah.suratSebelumnya &&
                        goToSurah(selectedSurah.suratSebelumnya.nomor)
                      }
                      disabled={!selectedSurah.suratSebelumnya}
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      {selectedSurah.suratSebelumnya
                        ? selectedSurah.suratSebelumnya.namaLatin
                        : "Surah Sebelumnya"}
                    </Button>

                    <Button
                      onClick={() =>
                        selectedSurah.suratSelanjutnya &&
                        goToSurah(selectedSurah.suratSelanjutnya.nomor)
                      }
                      disabled={!selectedSurah.suratSelanjutnya}
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {selectedSurah.suratSelanjutnya
                        ? selectedSurah.suratSelanjutnya.namaLatin
                        : "Surah Selanjutnya"}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Footer - Fixed */}
          <footer className="bg-card border-t border-border flex-shrink-0">
            <div className="px-4 py-4 text-center">
              <p className="text-muted-foreground text-sm">
                Data dari{" "}
                <a
                  href="https://equran.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  eQuran.id
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AlQuranApp;
