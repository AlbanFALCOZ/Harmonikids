import { Component, OnInit} from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

    title: string = '';
    search: string = '';
    
    constructor(private titleService: TitleService) {}

    ngOnInit(): void {
        this.title = this.titleService.getTitle();
        this.search = this.titleService.getSearch();
    }
}
