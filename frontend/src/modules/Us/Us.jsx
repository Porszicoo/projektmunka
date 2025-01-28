export const Us =() =>{
    return(<div className="p-6 sm:p-8 rounded-2xl shadow-md bg-white max-w-4xl mx-auto w-full h-full mt-8 sm:mt-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center">
        Akik a fejlesztés és az eladás mögött állnak.
      </h2>
      <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 text-center">
        A legjobb minőséget hozzuk nektek.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Kőműves Zoltán"
            className="rounded-lg w-40 h-40 sm:w-64 sm:h-64 object-cover mx-auto mb-4"
          />
          <h3 className="text-lg sm:text-xl font-bold">Kőműves Zoltán</h3>
          <p className="text-gray-600">Fejlesztő</p>
        </div>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Molnár Zsombor"
            className="rounded-lg w-40 h-40 sm:w-64 sm:h-64 object-cover mx-auto mb-4"
          />
          <h3 className="text-lg sm:text-xl font-bold">Molnár Zsombor</h3>
          <p className="text-gray-600">Értékesítő</p>
        </div>
      </div>
    </div>   
    );
};