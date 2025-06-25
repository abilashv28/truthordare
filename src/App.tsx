import Game from "./components/Game";
import BlogContent from "./components/BlogContent";
import Navigation from "./components/Navigation";
import { useAppState } from "./hooks/useAppState";

export default function App() {
  const { view, toggleView } = useAppState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <Navigation 
          view={view} 
          onToggleView={() => toggleView()}
        />

        {view === "game" ? <Game /> : <BlogContent />}
        
        <footer className="mt-8 text-gray-500 text-xs text-center">
          &copy; {new Date().getFullYear()} Truth or Dare Game
        </footer>
      </div>
    </div>
  );
}