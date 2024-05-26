import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent,CommonModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formFilters).toBeDefined();
    expect(component.formFilters.contains('userName')).toBeTruthy();
  });

  it('should navigate to the correct route on send', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    component.f.patchValue({ userName: 'testUser' });
    component.send();
    expect(navigateSpy).toHaveBeenCalledWith(['profile/testUser']);
  });

  it('should create the form with userName control', () => {
    component.createForm();
    expect(component.formFilters.contains('userName')).toBeTruthy();
  });

  it('should navigate to profile with navigateByProfile', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const userName = 'testUser';
    component.navigateByProfile(userName);
    expect(navigateSpy).toHaveBeenCalledWith([`profile/${userName}`]);
  });

  it('should return the form group from getter f', () => {
    component.createForm();
    expect(component.f).toBe(component.formFilters);
  });
});
