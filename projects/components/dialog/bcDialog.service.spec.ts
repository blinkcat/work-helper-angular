import { TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';

import { BcDialogService } from './bcDialog.service';

describe('BcDialogService', () => {
  let bcDialogService: BcDialogService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        BcDialogService,
        {
          provide: MatDialog,
          useValue: spy
        }
      ]
    });

    bcDialogService = TestBed.get(BcDialogService);
    matDialogSpy = TestBed.get(MatDialog);
  });

  it('should be created', () => {
    expect(bcDialogService).toBeTruthy();
  });

  it('#alert should call Matdialog open method', () => {
    bcDialogService.alert(null, '你真的要还款？', [{ text: '取消' }, { text: '确定', color: 'primary', focus: true }]);

    expect(matDialogSpy.open.calls.count()).toBe(1);

    const args = matDialogSpy.open.calls.first().args;

    expect(args[0].name).toBe('AlertComponent');

    expect(args[1]).toEqual({
      role: 'alertdialog',
      disableClose: true,
      minWidth: 280,
      data: {
        title: null,
        message: '你真的要还款？',
        actions: [
          { focus: false, closeOnClick: true, text: '取消' },
          { closeOnClick: true, text: '确定', color: 'primary', focus: true }
        ]
      }
    });
  });

  it('#select should call Matdialog open method', () => {
    const items = [
      {
        label: 'test1',
        value: 'test1'
      },
      {
        label: 'test2',
        value: 'test2',
        selected: true
      },
      {
        label: 'test3',
        value: 'test3',
        disabled: true
      }
    ];

    bcDialogService.select(true, '多选', '默认选中，或者disable', items);

    expect(matDialogSpy.open.calls.count()).toBe(1);

    const args = matDialogSpy.open.calls.first().args;

    expect(args[0].name).toBe('SelectComponent');

    expect(args[1]).toEqual({
      minWidth: 280,
      data: {
        multi: true,
        title: '多选',
        message: '默认选中，或者disable',
        items
      }
    });
  });
});
