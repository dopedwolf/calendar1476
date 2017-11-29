import { Component, Input, AfterContentChecked } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'

})
export class MessageComponent implements AfterContentChecked {
    @Input() message: Message;

    constructor(private messageService: MessageService) {}

    ngAfterContentChecked() {
      if(this.message.month == "1"){
        return this.message.month = "January";
      } else if(this.message.month == "2"){
        return this.message.month = "February";
      } else if(this.message.month == "3"){
        return this.message.month = "March";
      } else if(this.message.month == "4"){
        return this.message.month = "April";
      } else if(this.message.month == "5"){
        return this.message.month = "May";
      } else if(this.message.month == "6"){
        return this.message.month = "June";
      } else if(this.message.month == "7"){
        return this.message.month = "July";
      } else if(this.message.month == "8"){
        return this.message.month = "August";
      } else if(this.message.month == "9"){
        return this.message.month = "September";
      } else if(this.message.month == "10"){
        return this.message.month = "October";
      } else if(this.message.month == "11"){
        return this.message.month = "November";
      } else if(this.message.month == "12"){
        return this.message.month = "December";
      }
    }

    onEdit() {
      this.messageService.editMessage(this.message);
    }

    onDelete() {
        this.messageService.deleteMessage(this.message).
          subscribe(
            result => console.log(result)
          );
    }
}
