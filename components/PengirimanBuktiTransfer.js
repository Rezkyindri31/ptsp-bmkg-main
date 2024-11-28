import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@/app/MTailwind";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import usePengirimanBuktiTransfer from "@/hooks/Backend/usePengirimanBuktiTransfer";

const DialogPengirimanBuktiTransfer = ({
  open,
  onClose,
  ID_Pemesanan,
  ID_Transaksi,
}) => {
  const [files, setFiles] = useState([]);
  const { handlePengirimanBuktiTransfer, loading } =
    usePengirimanBuktiTransfer();
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  const kirimFileBuktiTransfer = (event) => {
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

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const simpanBuktiTransfer = async () => {
    if (!ID_Transaksi) {
      toast.error("ID Transaksi tidak ditemukan.");
      return;
    }

    if (files.length === 0) {
      toast.error("Tidak ada file yang dipilih.");
      return;
    }

    const rawFiles = files.map((file) => file.rawFile);

    try {
      await handlePengirimanBuktiTransfer(rawFiles, ID_Transaksi, ID_Pemesanan);
      onClose();
    } catch (error) {
      toast.error("Gagal mengirimkan dokumen.");
      console.error("Error uploading documents: ", error);
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      className="fixed inset-0 items-center justify-center w-96 h-auto mx-auto"
    >
      <DialogHeader>Pengiriman Dokumen Transaksi {ID_Pemesanan}</DialogHeader>
      <DialogBody>
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <Typography variant="paragraph">Deskripsi Kesalahan : </Typography>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 flex flex-col items-center justify-center">
            <input
              type="file"
              multiple
              onChange={kirimFileBuktiTransfer}
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
              onClick={simpanBuktiTransfer}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Simpan"}
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={handleClose}
              className="w-[48%]"
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DialogPengirimanBuktiTransfer;
