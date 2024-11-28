import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Radio } from "@/app/MTailwind";
import { firestore } from "@/lib/firebaseConfig";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import useStepperFormIKM from "@/hooks/Frontend/useStepperFormIKM";
const useMasukanIKM = () => {
  const { serviceItems } = useStepperFormIKM();
  const pengarah = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({
    meteorologi: [],
    klimatologi: [],
    geofisika: [],
    instrumentasi: [],
    humas: [],
  });

  const handleCheckboxChange = (section, label) => {
    setSelectedOptions((prevState) => {
      const currentSelection = prevState[section] || [];
      const updatedSelection = currentSelection.includes(label)
        ? currentSelection.filter((item) => item !== label)
        : [...currentSelection, label];
      return {
        ...prevState,
        [section]: updatedSelection,
      };
    });
  };

  const [responses, setResponses] = useState(
    serviceItems.map((item) => ({
      ...item,
      NamaPertanyaan: item.name,
      KualitasLayanan: "",
      HarapanKonsumen: "",
    }))
  );

  const handleSelectionChange = (type, id, value) => {
    setResponses((prevResponses) =>
      prevResponses.map((item) =>
        item.id === id ? { ...item, [type]: value } : item
      )
    );
  };

  const renderKualitasLayananGroup = useCallback(
    (id) => (
      <div className="flex space-x-4 text-sm">
        {["Sangat Setuju", "Setuju", "Kurang Setuju", "Tidak Setuju"].map(
          (label, idx) => (
            <Radio
              key={idx}
              id={`${id}-KualitasLayanan-${idx + 1}`}
              name={`${id}-KualitasLayanan`}
              label={label}
              onChange={() =>
                handleSelectionChange("KualitasLayanan", id, label)
              }
            />
          )
        )}
      </div>
    ),
    [responses]
  );

  const renderHarapanKonsumenGroup = useCallback(
    (id) => (
      <div className="flex space-x-4 mt-2 text-sm">
        {["Sangat Penting", "Penting", "Kurang Penting", "Tidak Penting"].map(
          (label, idx) => (
            <Radio
              key={idx}
              id={`${id}-HarapanKonsumen-${idx + 1}`}
              name={`${id}-HarapanKonsumen`}
              label={label}
              onChange={() =>
                handleSelectionChange("HarapanKonsumen", id, label)
              }
            />
          )
        )}
      </div>
    ),
    [responses]
  );

  const handleIKMSubmit = async (pemesananId) => {
    const penggunaSaatIni = localStorage.getItem("ID");
    if (!penggunaSaatIni) {
      toast.error("Anda harus masuk untuk mengirimkan IKM.");
      return;
    }

    const ikmData = {
      Opsi_Yang_Dipilih: selectedOptions,
      ikmResponses: responses,
    };

    try {
      const ikmRef = doc(firestore, "ikm", pemesananId);
      const docSnapshot = await getDoc(ikmRef);

      if (docSnapshot.exists()) {
        await updateDoc(ikmRef, ikmData);
      } else {
        await setDoc(ikmRef, ikmData, { merge: true });
      }

      const pemesananRef = doc(firestore, "pemesanan", pemesananId);
      const pemesananSnapshot = await getDoc(pemesananRef);

      if (pemesananSnapshot.exists()) {
        await updateDoc(pemesananRef, {
          Status_Pengisian_IKM: "Telah Diisi",
          Status_Pesanan: "Selesai",
        });
      } else {
        console.warn("Pemesanan dengan ID", pemesananId, "tidak ditemukan.");
      }

      toast.success("IKM berhasil dikirim!");
    } catch (err) {
      console.error("Gagal mengirim IKM:", err);
      toast.error("Gagal mengirim IKM.");
    }
  };

  return {
    renderKualitasLayananGroup,
    renderHarapanKonsumenGroup,
    responses,
    selectedOptions,
    setSelectedOptions,
    handleIKMSubmit,
    handleCheckboxChange,
  };
};

export default useMasukanIKM;
