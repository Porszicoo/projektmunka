export const Us =() =>{
    return(
      <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
              <div
                  className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                  <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                      <img className=" rounded-xl object-cover" src="https://pagedone.io/asset/uploads/1717741205.png" alt="about Us image" />
                  </div>
                  <img className="sm:ml-0 ml-auto rounded-xl object-cover" src="https://pagedone.io/asset/uploads/1717741215.png"
                      alt="about Us image" />
              </div>
              <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                  <div className="w-full flex-col justify-center items-start gap-8 flex">
                      <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                          <h2
                              className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                             Minőség. Megbízhatóság. Olcsón.</h2>
                          <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                              Minden márka ami az oldalon megtalálható az egy kollaborációs együttműködésnek köszönhető. Minden beszállító a legjobb minőséget szolgáltatja cégünk számára.
                              A fő célunk a prémium minőség a gyors és megbízható szállítás.</p>
                      </div>
                      <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                          <div className="flex-col justify-start items-start inline-flex">
                              <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">10+</h3>
                              <h6 className="text-gray-500 text-base font-normal leading-relaxed">Szín</h6>
                          </div>
                          <div className="flex-col justify-start items-start inline-flex">
                              <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">9+</h4>
                              <h6 className="text-gray-500 text-base font-normal leading-relaxed">Márka</h6>
                          </div>
                          <div className="flex-col justify-start items-start inline-flex">
                              <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">4+</h4>
                              <h6 className="text-gray-500 text-base font-normal leading-relaxed"> Év tapasztalat</h6>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>
      </div>
  </section>
                                          
    );
};