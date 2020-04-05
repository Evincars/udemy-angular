import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public vm = {
    name: "",
    height: 0,
    amount: 0,
    date: "",
    miles: 0
  };

  public onNameChange(enteredName: string) {
    this.vm.name = enteredName;
  }

  public onHeightChange(enteredHeight: string) {
    this.vm.height = parseFloat(enteredHeight);
  }

  public onDateChange(enteredDate: string) {
    this.vm.date = enteredDate;
  }

  public onAmountChange(enteredAmount: string) {
    this.vm.amount = parseFloat(enteredAmount);
  }

  public onMilesChange(enteredMiles: string) {
    this.vm.miles = parseFloat(enteredMiles);
  }
}
