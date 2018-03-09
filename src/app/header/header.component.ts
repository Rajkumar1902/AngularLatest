import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginUser: string;
  loginUserImage: string;
  constructor(private data: DataService) { console.log("In header.........."); }

  ngOnInit() {
    this.data.currentMessage.subscribe(user => {this.loginUser = user;
    this.setImage(this.loginUser);
    console.log("image----------------------"+this.loginUserImage);
    }
    );
  }

  resetLoginUser(){
    this.data.changeMessage('');
    sessionStorage.removeItem('loginUser')
  }

  setImage(user: string) {
    switch (user) {
      case "Shipper 1": {
        this.loginUserImage = "'assets/images/pravin.png'";
        break;
      }
      case "Carrier 1": {
        this.loginUserImage = "'assets/images/ganga.png'";
        break;
      }
      case "Freight Forwarder 1": {
        this.loginUserImage = "'assets/images/dutt.png'";
        break;
      }
      default: {
        this.loginUserImage = "'assets/images/rajkumar.png'";
        break;
      }
    }
  }

}
