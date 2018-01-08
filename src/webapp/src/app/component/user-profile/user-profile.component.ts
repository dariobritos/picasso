
import {Component, OnInit} from "@angular/core";
import {User} from "../../entities/User";
import {scenarioTypesConst, USER} from "../utils/constant/constants";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  implements OnInit{

    user : User;

    scenarioTypes = scenarioTypesConst;


    ngOnInit(): void {
      this.user = USER;
      console.log(this.user);
    }



}
