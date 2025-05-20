import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  nombre: string = 'Walter Cobacango';
  guardando: boolean = false;
  mensaje: string = '';

  constructor(private locationService: LocationService) {}

  async ngOnInit() {
    await Geolocation.requestPermissions();
    await this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Ubicación:', this.latitude, this.longitude);
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  async openInGoogleMaps() {
    if (this.latitude !== null && this.longitude !== null) {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      this.guardando = true;
      this.mensaje = '';
      try {
        await this.locationService.saveLocation(this.nombre, url);
        this.mensaje = 'Ubicación guardada correctamente en Firebase.';
        await Browser.open({ url });
      } catch (error) {
        this.mensaje = 'Error guardando en Firebase. Revisa la consola.';
        console.error('Error guardando ubicación o abriendo Google Maps:', error);
      } finally {
        this.guardando = false;
      }
    } else {
      alert('Ubicación no disponible');
    }
  }
}