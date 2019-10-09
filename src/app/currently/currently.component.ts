import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-currently',
  templateUrl: './currently.component.html',
  styleUrls: ['./currently.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentlyComponent implements OnInit {
  @Input() temperature: number;
  @Input() summary: string;
  @Input() location: string;
  @Input() precipProb: number;
  @Input() humidity: number;

  constructor() {}

  ngOnInit() {}
}
