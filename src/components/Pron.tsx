/** Spolszczona wymowa, np. [ak-se-sy-BI-li-ti]. */
export default function Pron({ text }: { text: string }) {
  return (
    <span className="pron">
      <span className="sr-only">Wymowa: </span>[{text}]
    </span>
  );
}
