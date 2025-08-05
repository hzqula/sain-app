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
      <div className="min-h-[80vh] py-12">
        {/* Header */}
        <div className="w-full items-center mb-12 flex flex-col justify-center w">
          <Bot className="h-24 w-24 mb-4 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Asisten Chatbot
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Pilih chatbot yang sesuai dengan kebutuhan Anda untuk mendapatkan
            konsultasi dan saran yang tepat
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:border-purple-600">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-fit group-hover:bg-purple-200 transition-colors">
                <Brain className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-heading font-bold">
                Botazel
              </CardTitle>
              <CardDescription className="text-sm text-justify">
                Chatbot-nya Kak Zelda (Mahasiswa Psikologi) yang akan siap
                membantumu konsultasi kesehatan mental, manajemen stres, dan
                informasi <span className="italic">bullying</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-sm">
                  Topik yang bisa dibahas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-900" variant="default">
                    Manajemen Stres
                  </Badge>
                  <Badge className="bg-purple-900" variant="default">
                    Kepercayaan Diri
                  </Badge>
                  <Badge className="bg-purple-900" variant="default">
                    Kecemasan
                  </Badge>
                  <Badge className="bg-purple-900" variant="default">
                    Motivasi
                  </Badge>
                  <Badge className="bg-purple-900" variant="default">
                    Hubungan
                  </Badge>
                </div>
              </div>
              <Button
                className="w-full text-white bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate("/chatbot/botazel")}
              >
                <Brain className="h-4 w-4 mr-2 " />
                Mulai Konsultasi Psikologi
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-green-600">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                <Apple className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-heading font-bold">
                Botaci
              </CardTitle>
              <CardDescription className="text-sm text-justify">
                Chatbot-nya Kak Aci (Mahasiswa Gizi) yang akan siap membantumu
                konsultasi informasi gizi, pola makan, asupan nutrisi, dan{" "}
                <span className="italic">stunting</span> di Desa Simpang Ayam.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-sm">
                  Topik yang bisa dibahas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-800" variant="default">
                    Diet Sehat
                  </Badge>
                  <Badge className="bg-green-800" variant="default">
                    Kalori
                  </Badge>
                  <Badge className="bg-green-800" variant="default">
                    Suplemen
                  </Badge>
                  <Badge className="bg-green-800" variant="default">
                    Menu Makanan
                  </Badge>
                  <Badge className="bg-green-800" variant="default">
                    Gizi Seimbang
                  </Badge>
                  <Badge className="bg-green-800" variant="default">
                    Stunting
                  </Badge>
                </div>
              </div>
              <Button
                className="w-full text-white bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/chatbot/botaci")}
              >
                <Apple className="h-4 w-4 mr-2" />
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
