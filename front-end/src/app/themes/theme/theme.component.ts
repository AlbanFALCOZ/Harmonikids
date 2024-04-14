import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from 'src/models/theme.model';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrl: './theme.component.scss'
})
export class ThemeComponent implements OnInit {

    @Input()
    theme?: Theme

    @Input() isDisabled: boolean = false;

    @Output()
    themeSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    editTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

    @Output()
    themeToDelete: EventEmitter<Theme> = new EventEmitter<Theme>();
    sonService: any;

    constructor() {

    }

    ngOnInit(): void {
    }

    selectTheme(): void {
        this.themeSelected.emit(true);
    }

    edit(): void {
        this.editTheme.emit(this.theme);
    }

    delete(): void {
        this.themeToDelete.emit(this.theme);
    }

    displayModalUpdate() {
        this.editTheme.emit(this.theme);
        var modal = document.getElementById("myModalUpdate");
        if (modal) {
            modal.style.display = "block";

            window.onclick = function (event) {
                if (event.target == modal && (modal)) {
                    modal.style.display = "none";
                }
            }
        }
    }

    displayModalDelete() {
        this.themeToDelete.emit(this.theme);
        var modal = document.getElementById("myModalDelete");
        if (modal) {
            modal.style.display = "block";

            window.onclick = function (event) {
                if (event.target == modal && (modal)) {
                    modal.style.display = "none";
                }
            }
        }
    }

}
