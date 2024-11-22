import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const KegiatanPemerintahanForm = ({ onSubmit }) => {
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
      await onSubmit(allFiles, "Kegiatan Pemerintahan Pusat atau Daerah");
    } else {
      toast.error("Silakan pilih file untuk diunggah.");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="section-pemerintahan w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Form Kegiatan Pemerintahan Pusat atau Daerah
      </h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Data Keperluan</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-bold">
              Mempunyai Perjanjian Kerjasama dengan BMKG tentang Kebutuhan
              Informasi MKKuG
            </p>
            <Input
              name="SuratKerjasama_Pemerintahan"
              className="input-custom"
              type="file"
              onChange={handleFileChange}
              labelProps={{ className: "hidden" }}
              multiple
            />
          </div>
          <div>
            <p className="text-sm font-bold">Surat Pengantar</p>
            <Input
              name="SuratPengantar_Pemerintahan"
              className="input-custom"
              type="file"
              onChange={handleFileChange}
              labelProps={{ className: "hidden" }}
              multiple
            />
          </div>
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

export default KegiatanPemerintahanForm;
