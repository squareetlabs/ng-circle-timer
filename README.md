# Angular Circle Countdown Timer Component

Flexible, lightweight, easy-to-use, without external dependencies and generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

### Install it
```npm install --save ng-circle-timer```

------------------------
## How to use it

You can use it by importing it into app.module.ts.
```
import { NgCircleTimerModule } from 'ng-circle-timer';

`@NgModule({
    imports: [NgCircleTimerModule],
    declarations: [],
    providers: [],
 })
export class AppModule { }
```
In case you are also using lazy loading pages, check if your pages have a module file, e.g. `otp.module.ts`. If they do, import `NgCircleTimerModule` into the module of each page where you are going to use it.
```
@NgModule({
    imports: [
        CommonModule,
        .....
        NgCircleTimerModule,
    ],
    declarations: [OtpPage]
})
export class OtpPageModule {
}
```
Once imported, it is ready for use. You can use it in your page controller file as follows:

```
@Component({
    selector: 'ngx-otp',
    templateUrl: './otp.page.html',
    styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, OnDestroy {
    @ViewChild('timer', {static: false}) timer: NgCircleTimerComponent;
    canSendCode: boolean = false;
    constructor() {
    }
    
    onTimeComplete: (event: Emoji) => {
          that.canSendCode = false;
    };
}
```
And in your page html file as follows:
```<ng-circle-timer #timer [duration]="60" (onComplete)="onTimeComplete($event)"></ng-circle-timer>```

## Building

Run `ng build ng-circle-timer` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-circle-timer`, go to the dist folder `cd dist/ng-circle-timer` and run `npm publish`.

## Running unit tests

Run `ng test ng-circle-timer` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Credits
- [Alberto Rial Barreiro](https://github.com/alberto-rial)
- [Jacobo Cantorna Cigarrán](https://github.com/jcancig)
- [Desarrollo de apps para moviles](https://squareet.com/desarrollo-de-aplicaciones-para-moviles) SquareetLabs

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
