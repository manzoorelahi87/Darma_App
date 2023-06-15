import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(private csv: GoogleService) { }
    homePhotoUrls = [];
    boardMembers = [];
    committeMembers = [];
    imageObject1 = [];
    notificationMessage: any;
    homeContent: any;

    ngOnInit() {

        this.csv.getBoardMemberDetails().subscribe((res) => {
            this.boardMembers = res;
        });

        this.csv.getCommitteMembers().subscribe((res) => {
            this.committeMembers = res;
            this.createImageObject();
        });

        this.csv.getEventPhotos().subscribe((res) => {
            this.homePhotoUrls = res;
        });

        this.csv.getHomeContent().subscribe((res) => {
            if (res[0].section === 'header'){
                this.homeContent = res[0].content;
            }
            if (res[1].section === 'notification'){
                this.notificationMessage = res[1].content;                
            }
        });
    }


    createImageObject() {
        for (let member of this.committeMembers) {
            const data = {
                image: member.imageUrl,
                thumbImage: member.imageUrl,
                title: member.name
            }
            this.imageObject1.push(data);
        }
    }
    imageObject = [{
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        title: 'Example with title.'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        title: 'Example two with title.'
    }];

}
