import {Injectable, EventEmitter} from '@angular/core';
import { Message } from "./message.model";
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
@Injectable()
export class MessageService {
    private messages: Message[] = [];
    //emits message object    v
    messageIsEdited = new EventEmitter<Message>();

    constructor(private http: Http){}

    addMessage(message: Message) {
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        //v  sets up observable
        return this.http.post('https://calendar-1476.herokuapp.com/event', body, {headers: headers})
            .map((response: Response) => {
              const result = response.json();
              return new Message(
                result.obj.title,
                result.obj.description,
                result.obj.date,
                result.obj.time,
                result.obj.venue,
                result.obj.address,
                result.obj.admission,
                result.obj.type,
                result.obj.url,
                result.obj._id,
                null
              );
            })
            .catch((error: Response) => Observable.throw(error.json()));
            //.map() allows you to transform data
    }
    //we return http since we create an observable in the component later on
    getMessages() {
        return this.http.get('https://calendar-1476.herokuapp.com/event')
              .map((response: Response) => {
                const messages = response.json().obj;
                //v  this transforms the result into what we want on the front end ex: (minus: _v, _id ...)
                let transformedMessages: Message[] = [];
                for(let message of messages) {
                  transformedMessages.push(new Message(
                    message.title,
                    message.description,
                    message.date,
                    message.time,
                    message.venue,
                    message.address,
                    message.admission,
                    message.type,
                    message.url,
                    message._id,
                    null
                  ));
                }
                //so the array being returned is the same as in the add message service
                //keeps them all in sync
                this.messages = transformedMessages;
                //we have to return since the map function expexts something to 'Observe'
                return transformedMessages;
              })
              .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
      //emits the message that is passed to this method
      this.messageIsEdited.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        //v  sets up observable
        return this.http.patch('https://calendar-1476.herokuapp.com/event/' + message.messageId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
            //.map() allows you to transform data
      }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('https://calendar-1476.herokuapp.com/event/' + message.messageId)
              .map((response: Response) => response.json())
              .catch((error: Response) => Observable.throw(error.json()));
    }
}
