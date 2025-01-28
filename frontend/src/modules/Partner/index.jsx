import { PartnerList } from "./_utils/constants";

const Partnerek = () => {
  return (<div className="w-full h-full px-4 sm:px-8 lg:px-16">
    <header>
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-8 sm:my-12">
        Jelenlegi Partnereink
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 justify-items-center">
        {PartnerList.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center justify-between"
          >
            <img
              src={partner.imgUrl}
              alt={partner.name}
              className="w-full max-w-[250px] h-auto px-4 py-2"
            />
          </div>
        ))}
      </div>
    </header>
  </div>
  );
};

export default Partnerek;
