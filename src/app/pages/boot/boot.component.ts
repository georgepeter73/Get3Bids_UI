import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-boot",
  templateUrl: "boot.component.html"
})
export class BootComponent implements OnInit {

  backendResponse : string = "";

  constructor(private ref: ChangeDetectorRef,private http: HttpClient) {}

  ngOnInit() {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem("idToken"), 'Access-Control-Allow-Origin': '*'}
      this.http.get<any>('http://localhost:8081/hello', { headers }).subscribe({
        next: data => {
          this.backendResponse = data["message"];
          console.log("From backend after authentication", this.backendResponse);
          this.ref.detectChanges();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
  }
}
