import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { BACKUP_REMINDER_DAYS, db, LAST_BACKUP_KEY, setMeta } from '../db';
import { isStandalone } from '../pages/SettingsPage';
import { DAY } from '../srs';
import Icon from './Icon';

/** Pasek "Nowa wersja" – aktualizacja nie rusza słówek, tylko podmienia kod aplikacji. */
export function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;
  return (
    <div className="banner" role="status">
      <span>Jest nowa wersja aplikacji. Twoje słówka zostaną zachowane.</span>
      <div className="row-actions">
        <button type="button" className="primary" onClick={() => updateServiceWorker(true)}>
          Odśwież
        </button>
        <button type="button" onClick={() => setNeedRefresh(false)}>
          Później
        </button>
      </div>
    </div>
  );
}

const INSTALL_DISMISSED = 'fiszki.installHintDismissed';

function isIOS() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/** Na iPhonie w Safari: zachęta do dodania aplikacji do ekranu początkowego. */
export function InstallHint() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(INSTALL_DISMISSED) === '1';
    } catch {
      return false;
    }
  });
  if (dismissed || !isIOS() || isStandalone()) return null;

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(INSTALL_DISMISSED, '1');
    } catch {
      /* ignoruj */
    }
  }

  return (
    <div className="banner">
      <span>
        Dodaj Fiszki do ekranu: stuknij <strong>Udostępnij</strong> (kwadrat ze strzałką) →<strong>Do ekranu początkowego</strong>. Słówka
        dodane w aplikacji z ekranu są bezpieczniejsze niż w karcie Safari.
      </span>
      <button type="button" className="icon-button" onClick={dismiss} aria-label="Zamknij podpowiedź">
        <Icon name="close" size={20} />
      </button>
    </div>
  );
}

const SNOOZE_KEY = 'backupSnoozedAt';

/** Przypomnienie o kopii zapasowej, gdy jest co chronić, a kopii dawno nie było. */
export function BackupReminder() {
  const state = useLiveQuery(async () => {
    const [words, last, snoozed] = await Promise.all([
      db.words.count(),
      db.meta.get(LAST_BACKUP_KEY),
      db.meta.get(SNOOZE_KEY),
    ]);
    return { words, last: (last?.value as number) ?? 0, snoozed: (snoozed?.value as number) ?? 0 };
  });
  if (!state || state.words < 10) return null;
  const now = Date.now();
  const latest = Math.max(state.last, state.snoozed);
  if (now - latest < BACKUP_REMINDER_DAYS * DAY) return null;

  return (
    <div className="banner">
      <span>
        {state.last
          ? `Ostatnia kopia zapasowa ponad ${BACKUP_REMINDER_DAYS} dni temu.`
          : `Masz już ${state.words} słówek – zrób kopię zapasową, żeby ich nie stracić.`}
      </span>
      <div className="row-actions">
        <Link to="/settings" className="button primary">
          Zrób kopię
        </Link>
        <button type="button" onClick={() => setMeta(SNOOZE_KEY, now)}>
          Później
        </button>
      </div>
    </div>
  );
}
