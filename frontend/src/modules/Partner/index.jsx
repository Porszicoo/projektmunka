import { PartnerList } from "./_utils/constants";

const Partnerek = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center px-4 sm:px-8 lg:px-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hatter.png')" }}
    >
      <header className="w-full max-w-6xl p-4 rounded-lg text-center">
        <h1 className="text-2xl sm:text-3xl font-bold my-8 sm:my-12 text-white">
          Jelenlegi Partnereink
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {PartnerList.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 shadow-sm transition-transform transform hover:scale-105 hover:shadow-md bg-white bg-opacity-50 rounded-lg w-full max-w-[180px]"
            >
              <img
                src={partner.imgUrl}
                alt={partner.name}
                className="w-full max-w-[150px] h-auto object-contain"
              />
            </a>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Partnerek;
