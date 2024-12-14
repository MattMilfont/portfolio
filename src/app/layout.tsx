// src/app/layout.tsx

import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
