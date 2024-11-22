import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input, Button } from "@material-tailwind/react";

const PenanggulanganBencanaForm = ({ onSubmit }) => {
  const [files, setFiles] = useState({});

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: Array.from(selectedFiles),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const allFiles = Object.values(files).flat();

    if (allFiles.length > 0) {
      await onSubmit(allFiles, "Kegiatan Penanggulangan Bencana");
    } else {
      toast.error("Silakan pilih file untuk diunggah.");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="section-penanggulanganbencana w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Form Kegiatan Penanggulangan Bencana
      </h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Data Keperluan</h3>
        <div className="mb-4">
          <p className="text-sm font-bold">Surat Pengantar Permintaan Data</p>
          <Input
            name="SuratPengantar_PenanggulanganBencana"
            className="input-custom"
            type="file"
            onChange={handleFileChange}
            labelProps={{ className: "hidden" }}
          />
        </div>
      </div>
      <div className="text-center">
        <Button color="blue" className="w-full" ripple="light" type="submit">
          Ajukan Sekarang
        </Button>
      </div>
    </form>
  );
};

export default PenanggulanganBencanaForm;
