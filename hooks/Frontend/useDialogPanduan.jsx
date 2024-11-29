import { useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    Button,
    Card,
} from "@/app/MTailwind";
import TabelInformasiUmum from "@/components/TabelInformasiLayanan1";
import TabelInformasiKhusus from "@/components/TabelInformasiLayanan2";
import TabelJasaKonsultasi from "@/components/TabelInformasiLayanan3";

export const useDialogPanduan = () => {
    const [isDialogOpenPanduan, setIsDialogOpenPanduan] =
        useState(false);
    const handleDialogOpenPanduan = () =>
        setIsDialogOpenPanduan(true);
    const handleDialogClosePanduan = () =>
        setIsDialogOpenPanduan(false);
    const DialogPanduan = (
        <Dialog
            size="lg"
            open={isDialogOpenPanduan}
            handler={setIsDialogOpenPanduan}
        >
            <DialogHeader className="uppercase">Panduan Penggunaan PTSP BMKG Bengkulu</DialogHeader>
            <DialogBody className="flex items-center justify-center w-full max-w-xs">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
                    <iframe
                        src="https://scribehow.com/embed/Cara_Mendaftarkan_Sebagai_Perusahaan_Di_Website_PTSP_BMKG__WdqNiMhRSI-t8PCUA93-Zw"
                        width="100%"
                        height="640"
                        allowFullScreen
                        frameBorder="0"
                    ></iframe>
                </div>
            </DialogBody>
        </Dialog>
    );


    return {
        DialogPanduan,
        handleDialogOpenPanduan,
        handleDialogClosePanduan,
    };
};
