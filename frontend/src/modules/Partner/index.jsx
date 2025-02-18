import { PartnerList } from "./_utils/constants";

const Partnerek = () => {
  return (
    <div
      className="w-full h-full px-4 sm:px-8 lg:px-16 bg-cover "
      style={{ backgroundImage: "url('/lanyfoto.png')" }}
    >
      <header className="p-4 rounded-lg">
        <h1 className="hover:shadow-md text-2xl sm:text-3xl font-bold text-center my-8 sm:my-12" >
          Jelenlegi Partnereink
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {PartnerList.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-between cursor-pointer p-3 shadow-sm transition-transform transform hover:scale-105 hover:shadow-md bg-white bg-opacity-50 rounded-lg"
            >
              <img
                src={partner.imgUrl}
                alt={partner.name}
                className="w-full max-w-[150px] h-auto"
              />
            </a>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Partnerek;
