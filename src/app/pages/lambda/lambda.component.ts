import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-lambda",
  templateUrl: "lambda.component.html"
})
export class LambdaComponent implements OnInit {

  constructor(private toastr: ToastrService) {}
  ngOnInit() {}
}
