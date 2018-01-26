import {Component} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {


    itemClick() {
        $('.navbar-collapse').collapse('hide');
    }
}
