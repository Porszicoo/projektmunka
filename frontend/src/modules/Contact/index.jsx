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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
      <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-12">
        <ContactSideBar />
        <div className="p-4 lg:col-span-2">
          <form>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Keresztnév"
                  className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Családnév"
                  className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>

              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="Telefonszám"
                  className="px-2 py-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
                <svg
                  fill="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>

              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-2 py-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>

              <div className="relative flex items-center sm:col-span-2">
                <textarea
                  placeholder="Írj üzenetet"
                  className="px-2 pt-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                ></textarea>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>

              <div className="col-span-full">
                <h6 className="text-sm text-gray-800">Válaszd ki a tárgyat</h6>
                <div className="flex max-lg:flex-col gap-6 mt-4">
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

                  <div className="flex items-center">
                    <input
                      id="radio2"
                      type="radio"
                      name="problem-radio"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="radio2"
                      className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                    >
                      <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                    </label>
                    <p className="text-sm text-gray-500 ml-4">
                      Technikai probléma
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="radio3"
                      type="radio"
                      name="problem-radio"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="radio3"
                      className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                    >
                      <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                    </label>
                    <p className="text-sm text-gray-500 ml-4">
                      Oldallal kapcsolatos visszajelzés
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
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
