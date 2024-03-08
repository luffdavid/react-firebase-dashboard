import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";


export const getWeightMeasurements = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const weightsCollectionRefs = collection(db, "users", userId, "weights");
      const querySnapshot = await getDocs(weightsCollectionRefs);

      const weightsData = [];
      querySnapshot.forEach((doc) => {
        weightsData.push({ id: doc.id, ...doc.data() });
      });

      return weightsData;
    } else {
      console.log(
        "Benutzerdokument nicht gefunden oder Weights-Subsammlung existiert nicht."
      );
      return [];
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Weights: ", error);
    return [];
  }
};
