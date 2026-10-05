import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteFrame, useSite } from "./components/Site";
import { Cursor } from "./components/Cursor";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { Project } from "./pages/Project";
import { Studio } from "./pages/Studio";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";

function Shell() {
  const { setReady, stage } = useSite();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-amber focus:text-ink focus:font-mono focus:text-[0.7rem] focus:uppercase focus:tracking-widest focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Preloader onReveal={() => setReady(true)} />
      <Nav />
      <Routes location={stage}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SiteFrame>
        <Shell />
      </SiteFrame>
    </HashRouter>
  );
}
