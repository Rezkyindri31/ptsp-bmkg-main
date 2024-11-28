import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@/app/MTailwind";
import { FaTrash } from "react-icons/fa";
import usePerbaikiDokumen from "@/hooks/Backend/usePerbaikanDokumen";

const DialogPerbaikanDokumen = ({ open, onClose, ajukanID, namaAjukan }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handlePerbaikiDokumen } = usePerbaikiDokumen();
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  const gantiFilePerbaikanDokumen = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = [];

    newFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        console.log("File size exceeds limit.");
        toast.error(`File maksimal hanya berukuran 2MB.`, {
          position: "top-left",
        });
      } else if (!SUPPORTED_FORMATS.includes(file.type)) {
        console.log("Unsupported file format.");
        toast.error(
          `Format file tidak mendukung. Hanya .png, .jpg, dan .pdf yang diperbolehkan.`
        );
      } else {
        validFiles.push({
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          rawFile: file,
        });
      }
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const hapusFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const simpanPerbaikanDokumen = async () => {
    const rawFiles = files.map((file) => file.rawFile);

    if (!ajukanID || rawFiles.length === 0) {
      alert("Please add files and ensure `ajukanID` is provided.");
      return;
    }

    await handlePerbaikiDokumen(ajukanID, rawFiles);
    onClose();
  };

  const renderInstructions = () => {
    switch (namaAjukan) {
      case "Kegiatan Penanggulangan Bencana":
        return "*Upload Kembali File Surat Pengantar";
      case "Kegiatan Keagamaan":
      case "Kegiatan Pertahanan dan Keamanan":
      case "Kegiatan Sosial":
        return "*Upload Kembali File Surat Permintaan Ditandatangani Camat atau Pejabat Setingkat";
      case "Kegiatan Pendidikan dan Penelitian Non Komersil":
        return "*Upload Kembali File Identitas Diri KTP / KTM / SIM / Paspor, Surat Pengantar dari Kepala Sekolah / Rektor / Dekan, Surat Pernyataan Tidak Digunakan Untuk Kepentingan Lain, Proposal Penelitian Berisi Maksud dan Tujuan Penelitian yang Telah Disetujui";
      case "Kegiatan Pemerintahan Pusat atau Daerah":
        return "*Upload Kembali File Mempunyai Perjanjian Kerjasama dengan BMKG tentang Kebutuhan Informasi MKKuG, Surat Pengantar";
      case "Kegiatan Tarif PNBP":
        return "*Upload Kembali File Identitas KTP, Surat Pengantar";
      default:
        return "*Surat Pernyataan";
    }
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      className="fixed inset-0 items-center justify-center w-96 h-auto mx-auto"
    >
      <DialogHeader>Perbaiki Dokumen Ajukan #{ajukanID || "N/A"}</DialogHeader>
      <DialogBody>
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <Typography
            variant="h5"
            className="text-lg font-semibold mb-4 text-red-900"
          >
            {renderInstructions()}
          </Typography>
          <Typography variant="paragraph">
            Deskripsi Kesalahannya : Disini
          </Typography>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 flex flex-col items-center justify-center">
            <input
              type="file"
              multiple
              onChange={gantiFilePerbaikanDokumen}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-500 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7M16 3l-4 4m0 0l-4-4m4 4V15"
                />
              </svg>
              <span className="text-gray-500 text-center">
                Drag and Drop or{" "}
                <span className="text-blue-500 underline">
                  Choose a Local File
                </span>
              </span>
              <span className="text-gray-400 text-xs">
                Format yang didukung: .png, .jpg, .pdf
              </span>
            </label>
          </div>
          <div className="space-y-2 mb-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
                <IconButton color="red" onClick={() => hapusFile(index)}>
                  <FaTrash className="w-5 h-5" />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              size="sm"
              color="blue"
              className="w-[48%]"
              onClick={simpanPerbaikanDokumen}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim"}
            </Button>
            <Button size="sm" color="red" onClick={onClose} className="w-[48%]">
              Tutup
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DialogPerbaikanDokumen;
