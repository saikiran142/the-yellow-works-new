import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

/** The storefront with its lights off and a "closed" sign. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="nf">
        <div>
          <Image src="/brand/mark-color-glow.svg" alt="" width={152} height={156} unoptimized priority />
          <div className="sign">CLOSED</div>
          <h1>This page has closed shop.</h1>
          <p style={{ margin: "0 0 var(--yw-space-5)", color: "var(--yw-text-on-dark-muted)" }}>The page you were looking for isn’t here.</p>
          <Link className="btn b-y" href="/">Back to the home page</Link>
        </div>
      </main>
    </>
  );
}
