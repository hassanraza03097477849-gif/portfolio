import type { Metadata, Route } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hassan Raza | Portfolio',
  description: 'Full Stack Engineer based in Karachi',
};

import { getAdminDb } from '@/lib/firebase/admin';
import Loader from '@/components/Loader';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = {
    fontFamily: "'levenimmt', 'Levenim MT', 'Levenim', sans-serif",
    light: {
      bgBase: "#f5f5f5",
      textBase: "#0a0a0a"
    },
    dark: {
      bgBase: "#0a0a0a",
      textBase: "#f5f5f5"
    }
  };

  try {
    const themeDoc = await getAdminDb().collection("siteSettings").doc("theme").get();
    if (themeDoc.exists) {
      theme = { ...theme, ...themeDoc.data() } as typeof theme;
    }
  } catch (error) {
    console.error("Failed to fetch theme settings", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-body: ${theme.fontFamily};
              --font-heading: ${theme.fontFamily};
              --bg-base: ${theme.light.bgBase};
              --text-base: ${theme.light.textBase};
              --black: ${theme.light.textBase};
              --white: ${theme.light.bgBase};
            }
            html.dark {
              --bg-base: ${theme.dark.bgBase};
              --text-base: ${theme.dark.textBase};
              --black: ${theme.dark.textBase};
              --white: ${theme.dark.bgBase};
            }
          `
        }} />
      </head>
      <body suppressHydrationWarning>
        <Loader />
        {children}
      </body>
    </html>
  );
}
