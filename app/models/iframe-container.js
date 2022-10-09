import Model, { attr, belongsTo } from '@ember-data/model';
import Control from './control';

export default class TextureControl extends Control {
    @attr("string") url
}
