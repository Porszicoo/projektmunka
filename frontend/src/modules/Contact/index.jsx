import { useState } from "react";
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import { Textarea } from "../../ui/components/Textarea";

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
    <div className="h-full w-full px-4 sm:px-6 lg:px-8">
      <header className="text-center space-y-4 my-8">
        <h1 className="text-2xl sm:text-3xl   font-bold">
          Kérdésed van? Elakadt vagy gond adódott a rendelés során? 
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold">
          Vedd fel velünk a kapcsolatot!
        </h2>
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 max-w-lg mx-auto"
      >
        <Input
          id="name"
          name="name"
          label="Nev"
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Textarea
          id="message"
          name="message"
          label="Uzenet"
          value={formData.message}
          onChange={handleChange}
        />
        <Button
          id="form-submit-btn"
          label="Uzenet Kuldese"
          type="submit"
          classes="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 w-full sm:w-auto"
        />
      </form>
    </div>
  );
};
