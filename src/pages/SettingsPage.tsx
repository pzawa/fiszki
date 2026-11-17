import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, exportData, importData, LAST_BACKUP_KEY, parseBackup, setMeta } from '../db';
import Icon from '../components/Icon';

/** Na iPhonie/Androidzie otwiera menu "Udostępnij" (np. Zachowaj w Plikach), na komputerze pobiera plik. */
async function saveFile(file: File): Promise<'shared' | 'downloaded' | 'cancelled'> {
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Kopia zapasowa Fiszek' });
      return 'shared';
    } catch (err) {
      if ((err as Error).name === 'AbortError') return 'cancelled';
      // inny błąd → spróbuj zwykłego pobrania
    }
  }
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return 'downloaded';
}

export function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export default function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const lastBackup = useLiveQuery(async () => (await db.meta.get(LAST_BACKUP_KEY))?.value as number | undefined);

  useEffect(() => {
    navigator.storage?.persisted?.().then(setPersisted).catch(() => setPersisted(null));
  }, []);

  async function handleExport() {
    const data = await exportData();
    const name = `fiszki-${new Date().toISOString().slice(0, 10)}.json`;
    const file = new File([JSON.stringify(data, null, 2)], name, { type: 'application/json' });
    const result = await saveFile(file);
    if (result === 'cancelled') return;
    await setMeta(LAST_BACKUP_KEY, Date.now());
    setMessage({
      ok: true,
      text: `Kopia gotowa: ${data.categories.length} kategorii, ${data.words.length} słówek.${
        result === 'shared' ? ' Najlepiej zapisz ją w Plikach lub na iCloud Drive.' : ''
      }`,
    });
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const backup = parseBackup(await file.text());
      const ok = confirm(
        `Import zastąpi wszystkie obecne dane (${backup.categories.length} kategorii, ${backup.words.length} słówek w pliku). Kontynuować?`,
      );
      if (!ok) return;
      await importData(backup);
      setMessage({ ok: true, text: 'Dane zostały zaimportowane.' });
    } catch (err) {
      setMessage({ ok: false, text: `Nie udało się zaimportować: ${(err as Error).message}` });
    }
  }

  return (
    <section aria-labelledby="page-title">
      <header className="page-head">
        <h1 id="page-title">Ustawienia</h1>
      </header>
      <div className="card">
        <h2>Kopia zapasowa</h2>
        <p className="muted">
          Słówka są zapisane na tym urządzeniu. Kopia w pliku chroni je, gdyby coś poszło nie tak – np. przy zmianie
          telefonu albo usunięciu aplikacji z ekranu głównego.
        </p>
        <p>
          Ostatnia kopia:{' '}
          <strong>{lastBackup ? new Date(lastBackup).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : 'jeszcze nie zrobiona'}</strong>
        </p>
        <div className="row-actions">
          <button type="button" className="primary" onClick={handleExport}>
            <Icon name="download" size={20} />
            Zrób kopię zapasową
          </button>
          <button type="button" onClick={() => fileRef.current?.click()}>
            <Icon name="upload" size={20} />
            Przywróć z pliku
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={handleImport} />
        </div>
        <p className={`notice ${message?.ok ? 'ok' : 'error'}`} role="status" aria-live="polite">
          {message?.text}
        </p>
      </div>

      <div className="card">
        <h2>Aplikacja</h2>
        <ul className="info-list">
          <li>
            Tryb: <strong>{isStandalone() ? 'zainstalowana na ekranie głównym' : 'w przeglądarce'}</strong>
          </li>
          {persisted !== null && (
            <li>
              Trwałe przechowywanie danych: <strong>{persisted ? 'włączone' : 'niepotwierdzone'}</strong>
            </li>
          )}
        </ul>
        {!isStandalone() && (
          <p className="muted">
            Na iPhonie otwórz tę stronę w Safari, stuknij <strong>Udostępnij</strong> →{' '}
            <strong>Do ekranu początkowego</strong>. Ucz się potem z ikony na ekranie – tam słówka są bezpieczne.
          </p>
        )}
      </div>
    </section>
  );
}
