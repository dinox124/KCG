import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { MatDialog,} from '@angular/material';
import { Http } from "@angular/http";
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ImageViewerController } from "ionic-img-viewer";
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  latitude: number;
  longitude: number;
  imgSrc = `url('${this.navParams.get('imgUrl')}')`;
  imgHeight = "80vh";
  film = {};
  constructor(private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams, private http: Http, public geolocation: Geolocation, private launchNavigator: LaunchNavigator, public imageViewerCtrl: ImageViewerController) {
    console.log(this.navParams.get('imgUrl'));
    console.log(this.navParams.get('id'));

    this.http.get(`https://karurcitygide.herokuapp.com/get-details-by-id/${this.navParams.get('id')}`).toPromise().then((movie) => {
      console.log(movie.json());
      this.film = movie.json();
    });




  }

  onClick(imageToView) {
    const viewer = this.imageViewerCtrl.create(imageToView)
    viewer.present();
  }



  getRattingArray(rating) {

    return Array(rating).fill(0).map((x, i) => { i });
  }
  launchDialer(n: string) {
    this.callNumber.callNumber(n, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
      console.log(n);
  }
  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    }, error => {
      console.log('error', error);
    });
  }
  navigateLocation() {
    let options: LaunchNavigatorOptions = {
      start: [50.279306, -4.749904],
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    this.launchNavigator.navigate('London, ON', options)
      .then(success => {
        console.log(success);
      }, error => {
        console.log(error);
      })


  }
}
