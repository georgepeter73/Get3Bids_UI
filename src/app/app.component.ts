import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  ngOnInit(): void {
    const el = document.getElementById("nb-global-spinner");
    if (el) {
      el.style["display"] = "none";
    }
  }
}
