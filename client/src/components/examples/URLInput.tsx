import URLInput from "../URLInput";

export default function URLInputExample() {
  return (
    <div className="p-8 max-w-2xl">
      <URLInput onSubmit={(url) => console.log("URL submitted:", url)} />
    </div>
  );
}
