import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import StudySetupPage from './pages/StudySetupPage';
import StudyPage from './pages/StudyPage';
import SettingsPage from './pages/SettingsPage';
import { InstallHint, UpdateBanner } from './components/Banners';
import Icon, { type IconName } from './components/Icon';

const TABS: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Kategorie', icon: 'cards', end: true },
  { to: '/learn', label: 'Nauka', icon: 'learn' },
  { to: '/settings', label: 'Ustawienia', icon: 'settings' },
];

export default function App() {
  const { pathname } = useLocation();
  const focusMode = pathname.startsWith('/study');

  return (
    <div className={`app${focusMode ? ' focus-mode' : ''}`}>
      <UpdateBanner />
      <InstallHint />
      <main id="content">
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/learn" element={<StudySetupPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!focusMode && (
        <nav className="tabbar" aria-label="Główna nawigacja">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `tab${isActive || (t.to === '/' && pathname.startsWith('/category')) ? ' active' : ''}`
              }
            >
              <Icon name={t.icon} size={24} />
              <span>{t.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
