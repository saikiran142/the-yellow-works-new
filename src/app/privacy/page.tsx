import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { analyticsConfigured, site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false } };

/**
 * DRAFT for review by a qualified professional before launch (India's Digital Personal Data Protection Act, 2023).
 * Bracketed items are facts only the owner can supply. Do not remove the draft notice until it has been reviewed.
 */
export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main" className="sec" style={{ paddingTop: "calc(var(--yw-header-h) + 3rem)" }}>
        <div className="w" style={{ maxWidth: "46rem" }}>
          <p className="tag t-c" role="note">Draft for legal review. Not yet final.</p>
          <h1 style={{ fontSize: "var(--yw-text-h2)", margin: "1rem 0" }}>Privacy policy</h1>
          <p>This policy explains what personal data {site.name} collects through this website, why, and what you can do about it. We have tried to keep it plain. Last updated: [EFFECTIVE_DATE].</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>Who is responsible</h2>
          <p>{site.name} ([LEGAL_ENTITY_NAME]) decides why and how your data is used. Contact us at <a href={`mailto:${site.email}`}>{site.email}</a>. Grievance officer: [GRIEVANCE_OFFICER_NAME], reachable at the same address.</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>What we collect, and why</h2>
          <p>When you send the enquiry form we collect your name, business name, business type, city, mobile number and message. We use them only to reply to your enquiry and to discuss a possible project. We do not ask for health, financial or other sensitive information. Please do not put any in the message box.</p>
          <p>We use your consent, which you give by sending the form, as the basis for this. You can withdraw it at any time by emailing us.</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>Who sees it</h2>
          <p>Your enquiry is passed to the service we use to receive it: Google (Google Sheets and Gmail), under our Google account. It is not sold, and it is not shared for advertising. We may share it with a professional adviser where the law requires it.</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>How long we keep it</h2>
          <p>[RETENTION_PERIOD]. After that we delete it, unless you become a customer or the law says we must keep it.</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>Analytics and cookies</h2>
          <p>{analyticsConfigured
            ? "We use a privacy-friendly analytics tool to count visits. It loads only if you click Accept on the notice, and does not follow you across other sites. If you decline, it does not load."
            : "This website does not currently use analytics or advertising cookies. If that changes, we will ask for your permission first and update this page."}</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>Your rights</h2>
          <p>You can ask us to show you the data we hold about you, correct it, delete it, or stop using it. Email {site.email} and we will reply within [RESPONSE_TIME]. If you are not satisfied, you may complain to the Data Protection Board of India.</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>Children</h2>
          <p>This website is for businesses. It is not directed at children, and we do not knowingly collect their data.</p>

          <h2 style={{ fontSize: "var(--yw-text-h4)", margin: "2rem 0 .5rem" }}>Changes</h2>
          <p>If we change this policy in a way that matters, we will update the date above and, where we hold your details, tell you.</p>
        </div>
      </main>
    </>
  );
}
