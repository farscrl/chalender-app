import {Component} from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent {

  public event: any;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventsService.getEvent(params['id']).subscribe((event: any) => {
        this.event = event;
      });
    });
  }
}
