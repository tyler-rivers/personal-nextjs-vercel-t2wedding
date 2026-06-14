const registries = [
  {
    label: 'Venmo',
    url: 'https://account.venmo.com/u/Tyler-A-Rivers'
  }
]

const RegistrySection = () => (
  <section id="registry" className="text-center">
    <h2 className="text-3xl font-bold mb-6 font-horley text-[#f2df93ff]">Wedding Registries</h2>
    <p className="max-w-2xl mx-auto mb-8">
      Your presence at our wedding is the greatest gift of all. However, should you wish to honor us with a gift, we would prefer a donation to our Honeymoon fund - we are fortunate enough to have all the bed sheets and stand mixers and other housewares that we can use.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      {registries.map((store, index) => (
        <a
          key={index}
          href={store.url}
          className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
          target="_blank"
        >
          {store.label}
        </a>
      ))}
    </div>
  </section>
);

export default RegistrySection;