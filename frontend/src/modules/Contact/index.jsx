import { useState } from "react";
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import { Textarea } from "../../ui/components/Textarea";
import { ContactSideBar } from "../../ui/components/ContactSideBar";

export const Kapcsolat = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    surname: "",
    phone: "",
  });

  const [notification, setNotification] = useState(""); // Értesítés állapot

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    // Az értesítés beállítása, miután a formot elküldtük
    setNotification("Köszönjük, hogy felvetted velünk a kapcsolatot!"); 
    
    // Töröljük a form adatokat (ha szeretnéd)
    setFormData({
      name: "",
      email: "",
      message: "",
      surname: "",
      phone: "",
    });
    
    // Az értesítés eltűnik 5 másodperc múlva
    setTimeout(() => setNotification(""), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-5xl max-lg:max-w-3xl mx-auto bg-white my-6 font-[sans-serif]">
      <div className="text-center px-6">
        <h2 className="text-gray-800 text-3xl font-bold">
          Vedd fel velünk a kapcsolatot
        </h2>
        <p className="text-sm text-gray-500 mt-4">
          Van valami ötleted ami segítheti az oldalt?
        </p>
      </div>

      {/* Értesítés megjelenítése */}
      {notification && (
        <div className="bg-green-600 text-white p-3 rounded mt-4 text-center">
          {notification}
        </div>
      )}

      <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-12">
        <ContactSideBar />
        <div className="p-4 lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Form mezők */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Keresztnév"
                  className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Családnév"
                  className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefonszám"
                  className="px-2 py-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="px-2 py-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="relative flex items-center sm:col-span-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Írj üzenetet"
                  className="px-2 pt-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                ></textarea>
              </div>

              <div className="col-span-full">
                <h6 className="text-sm text-gray-800">Válaszd ki a tárgyat</h6>
                <div className="flex max-lg:flex-col gap-6 mt-4">
                  {/* Radio buttons */}
                  <div className="flex items-center">
                    <input
                      id="radio1"
                      type="radio"
                      name="problem-radio"
                      className="hidden peer"
                      checked
                    />
                    <label
                      htmlFor="radio1"
                      className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                    >
                      <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                    </label>
                    <p className="text-sm text-gray-500 ml-4">
                      Általános probléma
                    </p>
                  </div>

                  {/* Other radio buttons */}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-3 tracking-wide text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                className="mr-2"
                viewBox="0 0 548.244 548.244"
              >
                <path
                  fill-rule="evenodd"
                  d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                  clip-rule="evenodd"
                  data-original="#000000"
                />
              </svg>
              Elküldés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
