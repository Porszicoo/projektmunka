import { Button } from "../../ui/components/Button";
import { Carousel } from "../../ui/components/Carousel";

export const Landing = () => {
  return (
    <section className="w-full h-full mt-12">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        
        <div className="mr-auto place-self-center lg:col-span-5 text-center lg:text-left">
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl md:text-5xl xl:text-6xl">
            TrendTees Webshop
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl dark:text-gray-400">
            Minőség. Megbízhatóság. Olcsón.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="/webshop">
              <Button
                label="Termékeink"
                id="webshop-btn"
                type="button"
                classes="inline-flex items-center justify-center px-5 py-3 text-sm sm:text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              />
            </a>
            <a href="/kapcsolat">
              <Button
                label="Vedd fel velünk a kapcsolatot"
                id="kapcsolat-btn-landing"
                type="button"
                classes="inline-flex items-center justify-center px-5 py-3 text-sm sm:text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              />
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="w-full h-full lg:w-[80%] aspect-video rounded-xl overflow-hidden shadow-lg">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};
