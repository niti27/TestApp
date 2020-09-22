import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
constructor(private toastr: ToastrService) { }
  showHTMLMessage(message, title) {
    this.toastr.success(message, title, {
      enableHtml :  true
    });
  }
  showSuccessWithTimeout(message, title, timespan) {
    this.toastr.success(message, title , {
        timeOut :  timespan
    });
  }
  // This is used to show the validation error
  error(message: string) {
    this.toastr.error(message);
  }
  // This is used to show the sucesss
  success(message: string) {
    this.toastr.success(message);
  }
  info(message: string) {
    this.toastr.info(message);
  }
  clear() {
    this.toastr.clear();
  }
}
