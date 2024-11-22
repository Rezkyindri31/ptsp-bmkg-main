import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const KegiatanPendidikanPenelitianForm = ({ onSubmit }) => {
  const [files, setFiles] = useState([]);

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
      await onSubmit(
        allFiles,
        "Kegiatan Pendidikan dan Penelitian Non Komersil"
      );
    } else {
      toast.error("Silakan pilih file untuk diunggah.");
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="section-pendidikan w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Form Kegiatan Pendidikan dan Penelitian Non Komersil
      </h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Data Keperluan</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-bold">
              Identitas Diri KTP / KTM / SIM / Paspor
            </p>
            <Input
              name="IdentitasDiri_Pendidikan"
              className="input-custom"
              type="file"
              onChange={handleFileChange}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              Surat Pengantar dari Kepala Sekolah / Rektor / Dekan
            </p>
            <Input
              name="SuratPengantar_Pendidikan"
              className="input-custom"
              type="file"
              onChange={handleFileChange}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              Surat Pernyataan Tidak Digunakan Untuk Kepentingan Lain
            </p>
            <Input
              name="SuratPernyataan_Pendidikan"
              className="input-custom"
              type="file"
              onChange={handleFileChange}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              Proposal Penelitian Berisi Maksud dan Tujuan Penelitian yang Telah
              Disetujui
            </p>
            <Input
              name="Proposal_Pendidikan"
              className="input-custom"
              type="file"
              onChange={handleFileChange}
              labelProps={{ className: "hidden" }}
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

export default KegiatanPendidikanPenelitianForm;
