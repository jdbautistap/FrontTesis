///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component,ElementRef, ViewChild, Renderer2} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationCoordinate2D } from 'src/app/models/LocationCoordinate2D';
import { InputResponse } from 'src/app/models/input-response';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  fligthid: any;
  fligth:any;
  user: any;
  mapa!: google.maps.Map;
  markersWaypoints: google.maps.LatLng[];
  markersCoordinates: google.maps.LatLng[];
  distancia!: string;


  fechaInicial:string
  fechaFinal:string
  


  constructor(private route: ActivatedRoute,
    private renderer: Renderer2,
    private authService: AuthService,
    private apiService:ApiService,) {
    this.markersWaypoints = [];
    this.markersCoordinates = [];
    this.fligthid ="";
    this.fechaInicial="";
    this.fechaFinal="";
    
   }

  

  ngOnInit() {

    this.user = this.authService.getUser();
    this.fligthid = this.route.snapshot.paramMap.get('id');
    const id= ""+this.fligthid
    this.apiService.getPastFligth(this.user.id,id).subscribe((flight: InputResponse) => {
      this.fligth=flight;
    });

    const fechaHora: Date = new Date(this.fligth.date);
    

  }

  ngAfterViewInit(): void {
    this.crearwaypointsList()
    this.crearCoordinateList()
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        await this.cargarMapa(position);

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };

  crearwaypointsList():any{
    this.fligth.waypointsList = this.fligth.waypointsList.replace(/LocationCoordinate2D/g, '');
    this.fligth.waypointsList = this.fligth.waypointsList.replace(/=/g, ':');
    this.fligth.waypointsList = this.fligth.waypointsList.replace(/latitude/g, '"latitude"').replace(/longitude/g, '"longitude"');
    const coordinatesArray: LocationCoordinate2D[]=JSON.parse(this.fligth.waypointsList)
    coordinatesArray.forEach((objeto: LocationCoordinate2D) => {
      const i=new google.maps.LatLng(objeto.latitude,objeto.longitude)
      this.markersWaypoints.push(i)
    });
  }
  crearCoordinateList():any{
    this.fligth.coordinates= this.fligth.coordinates.replace(/LocationCoordinate2D/g, '');
    this.fligth.coordinates = this.fligth.coordinates.replace(/=/g, ':');
    this.fligth.coordinates = this.fligth.coordinates.replace(/latitude/g, '"latitude"').replace(/longitude/g, '"longitude"');
    const coordinatesArray: LocationCoordinate2D[]=JSON.parse(this.fligth.coordinates)
    coordinatesArray.forEach((objeto: LocationCoordinate2D) => {
      const i=new google.maps.LatLng(objeto.latitude,objeto.longitude)
      this.markersCoordinates.push(i)
    });
  }

  cargarMapa(position: any): any {


    const opciones = {
      center: new google.maps.LatLng(this.fligth.locationinitLat,this.fligth.locationinitLng),
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)
    
    const markerPositionInit = new google.maps.Marker({
      position: new google.maps.LatLng(this.fligth.locationinitLat,this.fligth.locationinitLng),
      title: "Punto de inicio Dron",
      icon:{
        url:'https://cdn-icons-png.flaticon.com/512/3294/3294560.png',
        scaledSize: new google.maps.Size(30, 30), 
      }
    });
    const markerPositionFinish = new google.maps.Marker({
      position: new google.maps.LatLng(this.fligth.locationFinishLat,this.fligth.locationFinishLng),
      title: "Punto Fin Dron",    
      icon:{
        url:'https://cdn-icons-png.flaticon.com/512/3294/3294560.png',
        scaledSize: new google.maps.Size(30, 30), 
      }
    });

    const droneMovement = new google.maps.Polyline({
      path: this.markersCoordinates,
      geodesic: true,
      strokeColor: "#00FFFF",
      strokeOpacity: 1.0,
      strokeWeight: 2,  
    });

    let i = 1 

    this.markersWaypoints.forEach((objeto: google.maps.LatLng) => {
      const marker = new google.maps.Marker({
        position: objeto,
        title: "Waypoint"+i,
      });
      marker.setMap(this.mapa)
      i=i+1;
    })


    // Construct the polygon.
    const polygon = new google.maps.Polygon({
      paths: this.markersWaypoints,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    polygon.setMap(this.mapa);
    droneMovement.setMap(this.mapa)
    markerPositionInit.setMap(this.mapa);
    markerPositionFinish.setMap(this.mapa);
  };
}
