export default function Home() {
  return (
    <div className="min-h-screen bg-ocean-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-ocean-600 mb-4">
          HydroGrow Blog
        </h1>
        <p className="text-2xl text-cyan-600">
          Ocean Fresh Theme is Working! 🌊
        </p>
        <div className="mt-8">
          <button className="bg-ocean-600 text-white px-8 py-4 rounded-lg hover:bg-ocean-700 transition">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}
