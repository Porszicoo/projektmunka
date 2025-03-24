export const Us = () => {
  return (
    <section className="py-12 md:py-24 w-full h-full">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Images Section */}
          <div className="grid grid-cols-2 auto-rows-fr gap-4 order-last lg:order-first">
            <div className="flex justify-center sm:justify-end">
              <img
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl object-cover"
                src="https://pagedone.io/asset/uploads/1717741205.png"
                alt="About Us"
              />
            </div>
            <div className="flex justify-center sm:justify-start">
              <img
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl object-cover"
                src="https://pagedone.io/asset/uploads/1717741215.png"
                alt="About Us"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full max-w-2xl">
            <div className="flex flex-col gap-3">
              <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
                Minőség. Megbízhatóság. Olcsón.
              </h2>
              <p className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed">
                Minden márka, ami az oldalon megtalálható, egy kollaborációs együttműködésnek köszönhető.
                Minden beszállító a legjobb minőséget szolgáltatja cégünk számára.
                A fő célunk a prémium minőség, a gyors és megbízható szállítás.
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10">
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold">10+</h3>
                <h6 className="text-gray-500 text-base sm:text-lg">Szín</h6>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold">9+</h4>
                <h6 className="text-gray-500 text-base sm:text-lg">Márka</h6>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold">4+</h4>
                <h6 className="text-gray-500 text-base sm:text-lg">Év tapasztalat</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
