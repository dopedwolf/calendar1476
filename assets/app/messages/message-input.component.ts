import { Component, OnInit} from "@angular/core";
import { FormGroup, FormControl, Validators  } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    myForm: FormGroup;
    // v  represents message loaded into the input field (edit event)
    //undefined by default since it should be empty unless edit event
    message: Message;

    constructor(private messageService: MessageService) {}

    onSubmit() {
        //checks if this message is null or undefined
        //to see if edit or not
        if (this.message) {
          const form = this.myForm;
          //editing
          this.message.title = form.value.title;
          this.message.description = form.value.description;
          this.message.date = form.value.date;
          this.message.time = form.value.time;
          this.message.venue = form.value.venue;
          this.message.address = form.value.address;
          this.message.admission = form.value.admission;
          this.message.type = form.value.type;
          this.message.url = form.value.url;
          this.messageService.updateMessage(this.message)
            .subscribe(
              result => console.log(result)
            );
          //returns the object back to the original null
          this.message = null;

        } else {
          //creating
          const form = this.myForm;
          const message = new Message(form.value.title, form.value.description, form.value.date, form.value.time, form.value.venue, form.value.address, form.value.url, form.value.admission, form.value.type);
          this.messageService.addMessage(message)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
        }
        this.myForm.reset();
    }

    onClear() {
      //setting this back allows it to be loaded after being cleared multiple times
      this.message = null;
      this.myForm.reset();
    }

    ngOnInit() {
      this.myForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        date: new FormControl(null, Validators.required),
        time: new FormControl(null, Validators.required),
        venue: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        url: new FormControl(null, Validators.required),
        admission: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required)
      });
      //  v   subscribe to any event that may be emitted
      // informs this component gets informed when the edit button is clicked
      // and tells what to do which is
      //if message of type Message is received then make this.message = to that
      this.messageService.messageIsEdited.subscribe(
        (message: Message) => this.message = message
      );
    }
}
