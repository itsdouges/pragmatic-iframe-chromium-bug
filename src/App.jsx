import { JsxElementButton } from "./item";

function App() {
  return (
    <div className="bg-neutral-800">
      <JsxElementButton name="Foo" />
      <JsxElementButton name="Bar" />
      <JsxElementButton name="Baz" />
      <iframe
        src="http://google.com"
        className="absolute w-full h-full inset-0 -z-10"
      />
    </div>
  );
}

export default App;
