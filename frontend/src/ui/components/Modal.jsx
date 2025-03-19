import { useState, useEffect } from "react";

 export const TermsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted");
    if (!accepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Felhasználási Feltételek</h2>
        <p className="text-gray-700 mb-4">Kérjük, fogadd el a felhasználási feltételeket a folytatáshoz.</p>
        <button
          onClick={handleAccept}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Elfogadom
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
