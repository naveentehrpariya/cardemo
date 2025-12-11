export default function TestTailwind() {
  return (
    <div className="!min-h-screen !bg-blue-500 !flex !items-center !justify-center">
      <div className="!bg-white !p-8 !rounded-lg !shadow-xl">
        <h1 className="!text-4xl !font-bold !text-red-600 !mb-4">Tailwind Test</h1>
        <p className="!text-gray-700 !mb-2">If you see blue background and styled text, Tailwind is working!</p>
        <p className="!text-sm !mb-4">The ! prefix makes utilities important to override Bootstrap</p>
        <button className="!bg-green-500 hover:!bg-green-600 !text-white !px-6 !py-2 !rounded !mt-4">
          Test Button
        </button>
      </div>
    </div>
  );
}
