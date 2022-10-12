import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class ColorIndicatorComponent extends Component {
    @tracked popoverVisible = false

    get colorStyles() {
        let width = this.args.size + "px";
        let height = this.args.size + "px";

        if (!this.args.showCircle) {
            width = "100%";
            height = "100%";
        }

        let styles = {
            background: this.args.colorValue,
            width: width,
            height: height,
            borderRadius: (this.args.showCircle) ? this.args.size + "px" : "5px"
        };
    
        return styles;
    }

    @action
    showPopover(event) {
        if (!this.args.readOnly && this.args.showPopover) {
            this.popoverVisible = true;
        }
    }

    @action
    hidePopover(event) {
        this.popoverVisible = false;
    }

    @action
    clickPopover(event) {
        event.stopPropagation();
    }
    
    @action
    registerListener(element) {
        let options = { "passive": true };
        document.addEventListener('click', this.hidePopover, options);
    }
  
    @action
    unregisterListener(element) {
        let options = { "passive": true };
        document.removeEventListener('click', this.hidePopover, options);
    }
}
