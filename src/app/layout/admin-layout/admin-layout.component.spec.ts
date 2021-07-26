import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppRoutingModule } from "../../app-routing.module";
import { AppModule } from "../../app.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout.component";

describe("ContentLayoutComponent", () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
