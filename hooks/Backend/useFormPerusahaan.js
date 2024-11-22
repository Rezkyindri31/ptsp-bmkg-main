import { firestore, auth } from "@/lib/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

/**
 * @param {Object} formDataPerusahaan
 * @returns {Promise}
 */

export const addToPerusahaanCollection = async (formDataPerusahaan) => {
  try {
    const idPerusahaan = auth.currentUser?.uid;
    if (!idPerusahaan) throw new Error("User not authenticated");

    const perusahaanRef = doc(
      collection(firestore, "perusahaan"),
      idPerusahaan
    );
    await setDoc(perusahaanRef, formDataPerusahaan);

    console.log("Document successfully written with ID: ", idPerusahaan);
    return perusahaanRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
