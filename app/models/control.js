import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ControlModel extends Model {
    @service('url') urlService

    @attr('string') labelRaw
    @attr('string') customText
    @attr('boolean') customTextEnabled
    @attr('string') customDescription
    @attr('boolean') showLabel
    @attr('boolean') showValue

    @attr('string') controlAddress
    @attr('string') itemControlAddress
    @attr('string') name

    @attr('number') nativePositionX
    @attr('number') nativePositionY
    @attr('number') width
    @attr('number') height

    @attr('number') textSize
    @attr() textColor
    @attr() bgColor
    @attr() fgColor
    @attr() borderColor
    @attr('boolean') borderColorEnabled
    @attr('number') borderWidth
    @attr('boolean') opaqueBackground
    @attr('string') customImage
    @attr() colorMap
    @attr() options

    @attr('number') defaultUI
    @attr('number') style
    @attr('boolean') readOnly

    @belongsTo('dashboard') dashboard
    @attr('boolean') inGroup

    isEditing = false

    get label() {
        return (this.customTextEnabled) ? this.customText : this.labelRaw
    }

    get positionX() {
        let value = this.nativePositionX;
        if (!this.inGroup) value = value + (this.get("dashboard.width") / 2);

        return value;
    }

    get positionY() {
        let value = this.nativePositionY;        
        if (!this.inGroup) value = value + (this.get("dashboard.height") / 2);

        return value;
    }

    get hasRange() {
        return (this.maxVal != undefined && this.minVal != undefined) && (this.maxVal != 2147483648 && this.minVal != -2147483648);
    }

    get hasAllRanges() {
        return this.hasRange;
    }

    get modelName() {
        return this.constructor.modelName;
    }

    @computed('textColor', 'bgColor', 'fgColor', 'borderColor')
    get mixBlendMode() {
        return (this.textColor || this.bgColor || this.fgColor || this.borderColor) ? 'normal' : 'color-dodge';
    }

    @computed('textColor')
    get textColorRgba() {
        return this.transformToRgba('textColor');
    }
    
    @computed('bgColor')
    get bgColorRgba() {
        return this.transformToRgba('bgColor');
    }
        
    @computed('fgColor')
    get fgColorRgba() {
        return this.transformToRgba('fgColor');
    }
        
    @computed('borderColor')
    get borderColorRgba() {
        return this.transformToRgba('borderColor');
    }

    get imageSrc() {
        return this.urlService.imageSrc(this.customImage);
    }

    get isTime() {
        return this.defaultUI == 4 || this.style == 3;
    }

    get isColorIndicator() {
        return this.style == 10 || this.style == 11;
    }

    get isColorCircle() {
        return this.style == 10;
    }

    get colorValue() {
        if (this.style != 10 && this.style != 11) return "rgba(0,0,0,0)";

        let c = this.colorMap[this.value];

        if (c) return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3]/255 + ")";
        
        return "rgba(0,0,0,0)";
    }

    get smallerSize() {
        return (this.width > this.height) ? this.height : this.width;
    }

    transformToRgba(parameterName) {
        let color = this[parameterName];

        if (color) {
            const red = parseInt(this[parameterName][0] * 255);
            const green = parseInt(this[parameterName][1] * 255);
            const blue = parseInt(this[parameterName][2] * 255);
            const alpha = this[parameterName][3];
    
            return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha +  ')';
        }

        return 'none';
    }
}
