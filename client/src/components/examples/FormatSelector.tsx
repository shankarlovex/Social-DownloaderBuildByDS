import FormatSelector from "../FormatSelector";

export default function FormatSelectorExample() {
  return (
    <div className="p-8 max-w-4xl">
      <FormatSelector onDownload={(format, quality) => console.log(`Download ${format} ${quality}`)} />
    </div>
  );
}
