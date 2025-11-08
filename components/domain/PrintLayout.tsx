"use client";

interface PrintLayoutProps {
  lyrics: string;
  chords: string;
}

export function PrintLayout({ lyrics, chords }: PrintLayoutProps) {
  const handlePrint = () => {
    const win = window.open("", "print", "width=800,height=600");
    if (!win) return;
    win.document.write(
      `<html><head><title>Песня</title><style>body{font-family:Inter,sans-serif;padding:32px;}pre{background:#f7f7f7;padding:16px;border-radius:12px;}</style></head><body>`
    );
    win.document.write(`<h1>${document.title}</h1>`);
    win.document.write(`<h2>Аккорды</h2><pre>${chords}</pre>`);
    win.document.write(`<h2>Текст</h2><pre>${lyrics}</pre>`);
    win.document.write("</body></html>");
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-text-primary">Печать</h3>
          <p className="text-sm text-text-secondary">Сохраните аккорды и текст в удобном формате.</p>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Печать
        </button>
      </div>
      <div className="text-xs text-text-secondary">
        Совет: включите печать полей и используйте альбомную ориентацию для сборов.
      </div>
    </div>
  );
}
