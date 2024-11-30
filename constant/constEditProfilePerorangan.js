// components/UserProfile.js
import React from "react";
import { Typography, Input, Button } from "@/app/MTailwind";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useEditProfile from "@/hooks/Backend/useEditProfile";
import { toast } from "react-toastify";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHuruf";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";

function EditProfile() {
  const { detailPengguna } = useVerifikasiLogin();
  const {
    detailPengguna: editedDetailPengguna,
    tanganiGantiPengguna,
    tanganiSimpan,
    loading,
  } = useEditProfile(detailPengguna);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "No_Identitas") {
      const formattedInputNoIdentitas = formatNoIdentitas(value);
      tanganiGantiPengguna({
        target: { name, value: formattedInputNoIdentitas },
      });
      return;
    }

    if (["Pekerjaan", "Nama_Lengkap"].includes(name)) {
      const formattedInput = formatHuruf(value);
      tanganiGantiPengguna({ target: { name, value: formattedInput } });
      return;
    }

    if (["No_Hp"].includes(name)) {
      const formattedInputNoHP = formatNoTelepon(value);
      tanganiGantiPengguna({ target: { name, value: formattedInputNoHP } });
      return;
    }

    tanganiGantiPengguna({ target: { name, value } });
  };

  return (
    <div>
      {/* PERORANGAN EDIT */}
      {detailPengguna?.type === "perorangan" && (
        <>
          <div className="mb-6">
            <Typography variant="h4">Edit Profile Perorangan</Typography>
          </div>
          <div className="grid grid-cols-2 text-center gap-x-3 gap-y-3">
            <div>
              <Typography variant="h6" className="mb-2">
                Nomor Identitas
              </Typography>
              <Input
                name="No_Identitas"
                value={editedDetailPengguna.No_Identitas || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Pekerjaan
              </Typography>
              <Input
                name="Pekerjaan"
                value={editedDetailPengguna.Pekerjaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Nama Lengkap
              </Typography>
              <Input
                name="Nama_Lengkap"
                value={editedDetailPengguna.Nama_Lengkap || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Pendidikan Terakhir
              </Typography>
              <Input
                name="Pendidikan_Terakhir"
                value={editedDetailPengguna.Pendidikan_Terakhir || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Jenis Kelamin
              </Typography>
              <select
                name="Jenis_Kelamin"
                value={editedDetailPengguna.Jenis_Kelamin || ""}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border rounded-lg text-gray-500 input-custom"
              >
                <option value="" disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                No HP / No Telepon
              </Typography>
              <Input
                name="No_Hp"
                value={editedDetailPengguna.No_Hp || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                color="green"
                onClick={tanganiSimpan}
                disabled={loading}
                className="mt-4"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfile;
