import { db } from "../firebase.js"

export async function getGym(id) {
    alert(id)
    let doc = await db.collection("gyms").doc(id).get().catch(error => alert(error.message))
    let gym = doc.data()
    console.log(doc.data())
    console.log("TESSJKHDSADKJHDFKJSADHFKlj")
    console.log(gym)
/*     gym.id = doc.id
    return gym */ 
}

