import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private firestore: Firestore) {}

  async saveLocation(name: string, url: string) {
  try {
    const locCollection = collection(this.firestore, 'UbicacionesWALTER');
    const docRef = await addDoc(locCollection, { nombre: name, url: url, fecha: new Date() });
    console.log('Documento guardado con ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error guardando en Firestore:', error);
    throw error;
  }
}
}