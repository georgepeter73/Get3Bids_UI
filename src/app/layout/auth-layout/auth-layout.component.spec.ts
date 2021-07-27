import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppRoutingModule } from "../../app-routing.module";
import { AppModule } from "../../app.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AuthLayoutComponent } from "./auth-layout.component";

describe("AuthLayoutComponent", () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
