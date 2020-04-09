import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public currentPage = 0;

  public images = [
    {
      title: "Berlin",
      url: "../assets/berlin.jpg",
    },
    {
      title: "Mountains",
      url: "../assets/mountains.jpg",
    },
    {
      title: "Karnak",
      url: "../assets/karnak.jpg",
    },
    {
      title: "Shams Safage resorts",
      url: "../assets/shams_safaga.jpg",
    },
    {
      title: "Primosten",
      url: "../assets/primosten.jpg",
    },
    {
      title: "Berlin",
      url: "../assets/berlin.jpg",
    },
    {
      title: "Mountains",
      url: "../assets/mountains.jpg",
    },
    {
      title: "Karnak",
      url: "../assets/karnak.jpg",
    },
    {
      title: "Shams Safage resorts",
      url: "../assets/shams_safaga.jpg",
    },
    {
      title: "Primosten",
      url: "../assets/primosten.jpg",
    },
  ];

  public checkCurrentPage(index: number) {
    return Math.abs(this.currentPage - index) < 3;
  }
}
