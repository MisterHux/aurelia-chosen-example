//import {computedFrom} from 'aurelia-framework';
import {computedFrom, LogManager, inject, bindable, bindingMode} from 'aurelia-framework';
import DataItem from 'models/DataItem';
import {SampleBears} from 'sample-items-bears';
import * as _ from 'lodash';
import {ChosenSelect} from 'MisterHux/aurelia-chosen';

export class Welcome {
  heading = 'Welcome to the Aurelia Navigation App!';
  bearTitle = 'John';
  bearName = 'Doe';
  previousValue = this.fullName;
  private logger = LogManager.getLogger("Welcome");
  public firstExample: Array<DataItem> = _.cloneDeep(SampleBears);
  public secondExample: Array<DataItem>;
  public firstBear: DataItem | Array<DataItem>;
  public secondBear: DataItem | Array<DataItem>;
  private _secondChosen: ChosenSelect;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  @computedFrom('bearTitle', 'bearName')
  get fullName() {
    let fullName: string = `${this.bearTitle} (${this.bearName})`
      return fullName;
  }

  public activate(): void {
    setTimeout(() => {
      this.secondExample = _.cloneDeep(SampleBears);
    }, 2000)
  }

  submit() {
    this.previousValue = this.fullName;
    //alert(`Welcome, ${this.fullName}!`);
    var newName = `New Item - ${this.fullName}`;
    var test = this.firstExample;
    
    test.push(new DataItem({ name: this.bearName, title: this.bearTitle, description: newName, id: test.length + 1}));
    this.firstExample = test;
    this.logger.debug(this.firstExample);    
  }

  public firstBearChanged(firstBear) {
      this.logger.debug('firstBearChanged', firstBear);
  }

  public myEventCallback(evt) {
      this.logger.debug('myEventCallback', evt);
      // The selected value will be printed out to the browser console
  }

  public changeDisplayProperty = (): void => {
    this.logger.debug('changeDisplayProperty');
    if (this._secondChosen.displayProperty === 'title') {
      this._secondChosen.displayProperty = 'name';
    } else {
      this._secondChosen.displayProperty = 'title';
    }
  }

  canDeactivate() {
      if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
      }
  }
}

export class SciNameValueConverter {
  toView(value) {
    if (value) {
      var sciName = value.substring(value.indexOf('(') + 1, value.indexOf(')'));
      var sciUpper = sciName.toLowerCase();
      sciUpper = _.upperFirst(sciUpper);
      return value.replace(sciName, sciUpper);
    }
  }
}
