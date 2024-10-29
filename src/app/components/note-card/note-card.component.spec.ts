import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { StarredService } from '../../stores/starred.service';
import { DateFormatService } from '../../utils/date-format.service';
import { of } from 'rxjs';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let starredServiceMock: jasmine.SpyObj<StarredService>;
  let dateFormatServiceMock: jasmine.SpyObj<DateFormatService>;

  beforeEach(async () => {

    starredServiceMock = jasmine.createSpyObj('StarredService', ['isNoteStarred', 'starNote', 'unstarNote'], {
      starredStatusChanged$: of()
    });

    dateFormatServiceMock = jasmine.createSpyObj('DateFormatService', ['formatDate']);

    await TestBed.configureTestingModule({
      imports: [NoteCardComponent],
      providers: [
        { provide: StarredService, useValue: starredServiceMock },
        { provide: DateFormatService, useValue: dateFormatServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;

    component.note = { id: '1', starred: false };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isStarred based on localStorage or note property', () => {
    const getItemSpy = spyOn(localStorage, 'getItem');
  
    getItemSpy.and.returnValue(null);
    component.ngOnInit();

    expect(component.isStarred).toBe(false);
  
    
    getItemSpy.and.returnValue('true');
    component.ngOnInit();

    expect(component.isStarred).toBe(true);

  });
  

  it('should toggle isStarred and call appropriate starred service methods', () => {
    component.isStarred = false;
    component.toggleStar();

    expect(component.isStarred).toBe(true);
    expect(starredServiceMock.starNote).toHaveBeenCalledWith('1');

    component.toggleStar();
    expect(component.isStarred).toBe(false);
    expect(starredServiceMock.unstarNote).toHaveBeenCalledWith('1');
  });

  it('should format date using DateFormatService', () => {
    dateFormatServiceMock.formatDate.and.returnValue('Formatted Date');
    const result = component.formatDate('2024-10-28');
    expect(result).toBe('Formatted Date');
    expect(dateFormatServiceMock.formatDate).toHaveBeenCalledWith('2024-10-28');
  });
});
