import InstallPWA from "./components/InstallPWA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children} {/* ✅ Cela garantit que ton contenu principal s'affiche bien */}
        <InstallPWA /> {/* ✅ Le bouton d'installation reste visible */}
      </body>
    </html>
  );
}
