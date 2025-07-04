import Game from "./components/Game";
import BlogContent from "./components/BlogContent";
import BlogPost from "./components/BlogPost";
import Navigation from "./components/Navigation";
import { useAppState } from "./hooks/useAppState";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function App() {
  const { view, toggleView } = useAppState();
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col">
        <div className="w-full px-4 pt-4 mb-2">
          <Navigation view={view} onToggleView={() => toggleView()} />
        </div>

        <div className="flex-grow flex justify-center items-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={view === "game" ? <Game /> : <Navigate to="/blog" />} />
              <Route path="/blog" element={<BlogContent />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <footer className="mt-8 text-gray-500 text-xs text-center">
              &copy; {new Date().getFullYear()} {t('app.title')}
              <div className="flex justify-center gap-4 mt-2 text-xl">
                <a
                  href="https://www.instagram.com/truthordarefunzzz?igsh=MWVkY3EwOXd5aHMxNA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram">
                  <img src="./icons/insta.svg" alt="Instagram" className="w-8 h-8" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61577692898276" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <img src="./icons/meta.svg" alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="https://x.com/truthordarefunz?t=Vvkkc5Uptj7Moc7x4KFIww&s=08" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <img src="./icons/x.svg" alt="Twitter" className="w-8 h-8" />
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
