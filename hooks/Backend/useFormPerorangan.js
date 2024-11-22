import { firestore, auth } from "@/lib/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

/**
 * @param {Object} formDataPerorangan
 * @returns {Promise}
 */

export const addToPeroranganCollection = async (formDataPerorangan) => {
  try {
    const idPerorangan = auth.currentUser?.uid;
    if (!idPerorangan) throw new Error("User not authenticated");

    const peroranganRef = doc(
      collection(firestore, "perorangan"),
      idPerorangan
    );
    await setDoc(peroranganRef, formDataPerorangan);

    console.log("Document successfully written with ID: ", idPerorangan);
    return peroranganRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
