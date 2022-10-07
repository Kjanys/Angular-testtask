import {Component} from '@angular/core';;
import * as moment from 'moment'

@Component({
  selector: 'recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss']
})
export class RecomendationComponent {
  data: any[] = [];
  constructor() {
    setInterval(()=>{
      let now = moment().format('hh:mm:ss DD-MM-YYYY');
      this.data.unshift(now);
      console.log(this.data);
    }, 15000)
  }
}
