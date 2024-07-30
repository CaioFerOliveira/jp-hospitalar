import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNaoEncrontradaComponent } from './pagina-nao-encrontrada.component';

describe('PaginaNaoEncrontradaComponent', () => {
  let component: PaginaNaoEncrontradaComponent;
  let fixture: ComponentFixture<PaginaNaoEncrontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNaoEncrontradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNaoEncrontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
