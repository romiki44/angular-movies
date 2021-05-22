import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { CoordinatesMap, CoordinatesMapWithMessage } from './coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor() {}

  @Input()
  initialCoordinates: CoordinatesMapWithMessage[] = [];
  @Input()
  editMode: boolean = true;
  @Output()
  onSelectedLocation = new EventEmitter<CoordinatesMap>();

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Angular Movies',
      }),
    ],
    zoom: 14,
    center: latLng(18.473564631048617, -69.93999481201173),
  };

  layers: Marker<any>[] = [];

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((value) => {
      const m = marker([value.latitude, value.longitude]);
      if (value.message) {
        m.bindPopup(value.message, { autoClose: false, autoPan: false });
      }
      return m;
    });
  }

  handleMapClick(event: LeafletMouseEvent) {
    if (this.editMode) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log(latitude, longitude);
      this.layers = [];
      this.layers.push(marker([latitude, longitude]));
      this.onSelectedLocation.emit({ latitude, longitude });
    }
  }
}
