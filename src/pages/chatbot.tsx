"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Apple, Bot } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="min-h-[80vh] py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full max-w-6xl mx-auto items-center mb-8 sm:mb-10 lg:mb-12 flex flex-col justify-center">
          <Bot className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mb-3 sm:mb-4 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4 text-center px-2">
            Asisten Chatbot
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-center text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Pilih chatbot yang sesuai dengan kebutuhan Anda untuk mendapatkan
            konsultasi dan saran yang tepat
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          {/* Botazel Card */}
          <Card className="hover:border-purple-600 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="mx-auto mb-3 sm:mb-4 p-3 sm:p-4 bg-purple-100 rounded-full w-fit hover:bg-purple-200 transition-colors">
                <Brain className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-600" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-heading font-bold mb-2">
                Botazel
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-justify leading-relaxed">
                Chatbot-nya Kak Zelda (Mahasiswi Psikologi) yang akan siap
                membantumu konsultasi kesehatan mental, manajemen stres, dan
                informasi <span className="italic">bullying</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 mb-4 sm:mb-6">
                <h4 className="font-medium text-xs sm:text-sm">
                  Topik yang bisa dibahas:
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge
                    className="bg-purple-900 text-xs px-2 py-1"
                    variant="default"
                  >
                    Manajemen Stres
                  </Badge>
                  <Badge
                    className="bg-purple-900 text-xs px-2 py-1"
                    variant="default"
                  >
                    Kepercayaan Diri
                  </Badge>
                  <Badge
                    className="bg-purple-900 text-xs px-2 py-1"
                    variant="default"
                  >
                    Kecemasan
                  </Badge>
                  <Badge
                    className="bg-purple-900 text-xs px-2 py-1"
                    variant="default"
                  >
                    Motivasi
                  </Badge>
                  <Badge
                    className="bg-purple-900 text-xs px-2 py-1"
                    variant="default"
                  >
                    Hubungan
                  </Badge>
                </div>
              </div>
              <Button
                className="w-full text-white bg-purple-600 hover:bg-purple-700 transition-colors text-xs sm:text-sm py-2 sm:py-3"
                onClick={() => navigate("/chatbot/botazel")}
              >
                <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Mulai Konsultasi Psikologi
              </Button>
            </CardContent>
          </Card>

          {/* Botaci Card */}
          <Card className="hover:border-green-600 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="mx-auto mb-3 sm:mb-4 p-3 sm:p-4 bg-green-100 rounded-full w-fit hover:bg-green-200 transition-colors">
                <Apple className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-600" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-heading font-bold mb-2">
                Botaci
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-justify leading-relaxed">
                Chatbot-nya Kak Aci (Mahasiswi Gizi) yang akan siap membantumu
                konsultasi informasi gizi, pola makan, asupan nutrisi, dan{" "}
                <span className="italic">stunting</span> di Desa Simpang Ayam.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 mb-4 sm:mb-6">
                <h4 className="font-medium text-xs sm:text-sm">
                  Topik yang bisa dibahas:
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge
                    className="bg-green-800 text-xs px-2 py-1"
                    variant="default"
                  >
                    Diet Sehat
                  </Badge>
                  <Badge
                    className="bg-green-800 text-xs px-2 py-1"
                    variant="default"
                  >
                    Kalori
                  </Badge>
                  <Badge
                    className="bg-green-800 text-xs px-2 py-1"
                    variant="default"
                  >
                    Suplemen
                  </Badge>
                  <Badge
                    className="bg-green-800 text-xs px-2 py-1"
                    variant="default"
                  >
                    Menu Makanan
                  </Badge>
                  <Badge
                    className="bg-green-800 text-xs px-2 py-1"
                    variant="default"
                  >
                    Gizi Seimbang
                  </Badge>
                  <Badge
                    className="bg-green-800 text-xs px-2 py-1"
                    variant="default"
                  >
                    Stunting
                  </Badge>
                </div>
              </div>
              <Button
                className="w-full text-white bg-green-600 hover:bg-green-700 transition-colors text-xs sm:text-sm py-2 sm:py-3"
                onClick={() => navigate("/chatbot/botaci")}
              >
                <Apple className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Mulai Konsultasi Gizi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ChatbotPage;
