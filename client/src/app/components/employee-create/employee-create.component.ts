import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginServiceService } from '../app-component/login-service.service';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DatepickerOptions } from 'ng2-datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { config } from 'process';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})

export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  scheduleForm: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  private _id: any;
  data: any;
  allretailer: any = [];
  retailerDate: any = [];
  public options: DatepickerOptions;
  products: any = [];
  allselectedRetailer: any = [];
  selectedOutTime = '00:00';
  selectedInTime = '00:00';
  theDate: Date = new Date();
  retailer: any = [];

  constructor(
    protected formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private atp: AmazingTimePickerService,
    private _router: Router,
    private loginService: LoginServiceService
  ) {
    this.options = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'DD-MM-YYYY',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
    };

    this._activatedRoute.params.subscribe(params => {
      this._id = params.id;
      console.log(params)
      if (this._id) {
        this.loginService.getSingleDetailsById(this._id).subscribe(
          data => {
            this.allretailer = data;
            console.log(data)
            this.allretailer.forEach(ele => {
              this.allselectedRetailer.push({
                retailer_name: ele.retailer_name,
                in_time: ele.in_time,
                out_time: ele.out_time,
                executive_id: ele.executive_id
              })

            });
            console.log(this.allselectedRetailer)
            this.source.load(this.allselectedRetailer)

          },
          // err => errorHandler(err)
        );
      }

    });

    this.scheduleForm = formBuilder.group({
      retailer_name: ["", Validators.required],
      inTime: ["", Validators.required],
      outTime: ["", Validators.required],
    });
  }
  openOutTimeDialog() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedOutTime,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedOutTime = time;
    });
  }
  openInTimeDialog() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedInTime,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedInTime = time;
    });
  }

  public source = new LocalDataSource();
  public settings = {
    hideSubHeader: true,
    actions: {
      delete: false,
      edit: false,
      add: false
    },
    edit: {
      editButtonContent: 'Edit',
      saveButtonContent: 'Save ',
      cancelButtonContent: 'Cancel ',
      confirmSave: true,
    },


    delete: {
      deleteButtonContent: "Delete",
      confirmDelete: true
    }
    ,
    columns: {
      'slNo': {
        title: 'Sl No',
        editable: false,
        valuePrepareFunction(value, row, cell) {
          return cell.row.index + 1;
        }
      },
      executive_id: {
        title: "Executive Name",
        editable: false,
      },
      retailer_name: {
        title: "Retailer Name",
        editable: false,
      },

      in_time: {
        title: 'In Time',
        valuePrepareFunction: (in_time) => {
          const raw = new Date(in_time);
          const formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy h:mm:ss');
          return formatted;
        }
      },
      out_time: {
        title: 'In Time',
        valuePrepareFunction: (out_time) => {
          const raw = new Date(out_time);
          const formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy h:mm:ss', 'GMT+1');
          return formatted;
        }
      },


    },


  };
  ngOnInit() { }

  parseTime(t) {
    var d = new Date();
    var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
  }

  // Choose designation with select dropdown
  // updateProfile(e){
  //   this.employeeForm.get('designation').setValue(e, {
  //     onlySelf: true
  //   })
  // }

  // Getter to access form control
  // get myForm(){
  //   return this.employeeForm.controls;
  // }
  onDate(event) {
    console.log(event)
    this.theDate = new Date(event);
    console.log(this.theDate)
  }
  onSubmit() {
    var inTimeDate = this.parseTime(this.selectedInTime);
    var outTimeDate = this.parseTime(this.selectedOutTime);
    var builtInTime: Date = new Date(this.theDate.getFullYear(), this.theDate.getMonth(), this.theDate.getDay(), inTimeDate.getHours(), inTimeDate.getMinutes(), inTimeDate.getSeconds(), inTimeDate.getMilliseconds());
    var builtOutTime: Date = new Date(this.theDate.getFullYear(), this.theDate.getMonth(), this.theDate.getDay(), outTimeDate.getHours(), outTimeDate.getMinutes(), outTimeDate.getSeconds(), outTimeDate.getMilliseconds());
    var retailer_name = this.scheduleForm.controls["retailer_name"].value
    this.loginService.createSchedule(builtInTime, builtOutTime, retailer_name, this._id).subscribe(result => {
      console.log(result)
      this.allretailer = [result];
            console.log(result)
            this.allretailer.forEach(ele => {
              this.allselectedRetailer.push({
                retailer_name: ele.retailer_name,
                in_time: ele.in_time,
                out_time: ele.out_time,
                executive_id: ele.executive_id
              })

            });
            console.log(this.allselectedRetailer)
            this.source.load(this.allselectedRetailer)
    })
  }
  // onSubmit() {
  //   this.submitted = true;
  //   if (!this.employeeForm.valid) {
  //     return false;
  //   } else {
  //     this.apiService.createEmployee(this.employeeForm.value).subscribe(
  //       (res) => {
  //         console.log('Employee successfully created!')
  //         this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
  //       }, (error) => {
  //         console.log(error);
  //       });
  //   }
  // }

}
