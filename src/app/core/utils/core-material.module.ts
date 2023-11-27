import {NgModule} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class CoreMaterialModule { }
