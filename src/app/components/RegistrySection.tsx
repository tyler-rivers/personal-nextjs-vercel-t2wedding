const RegistrySection = () => (
  <section id="registry" className="text-center">
    <h2 className="text-3xl font-bold mb-6 font-horley text-[#f2df93ff]">Wedding Registries</h2>
    <p className="max-w-2xl mx-auto mb-8">
      Your presence at our wedding is the greatest gift of all. However, should you wish to honor us with a gift, we have registered at the following stores.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      {['Amazon', 'Target', 'Crate & Barrel'].map((store, index) => (
        <a
          key={index}
          href="#" // Replace with actual registry links
          className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          {store}
        </a>
      ))}
    </div>
  </section>
);

export default RegistrySection;