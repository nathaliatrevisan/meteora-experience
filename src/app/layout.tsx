// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meteora Experience",
  description: "Soluções digitais com foco em performance, design e inovação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        // Adicionei 'pt-[76px]' aqui.
        // A altura do seu header é aproximadamente 64px (py-4 totaliza 64px de altura visual, 16 + 40 + 16).
        // 76px = 64px (altura do header) + 12px (sobra/margem)
        // Você pode ajustar '76px' para um valor maior ou menor conforme a 'sobra' que deseja.
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-[76px]`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}