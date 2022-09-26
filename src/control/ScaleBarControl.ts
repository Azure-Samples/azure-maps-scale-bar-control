import * as azmaps from "azure-maps-control";
import { ScaleBarControlOptions } from './ScaleBarControlOptions';

/** A control that displays a scale bar relative to the pixel resolution at the center of the map. */
export class ScaleBarControl implements azmaps.Control {
    /****************************
        * Private Properties
        ***************************/

    private _map: azmaps.Map = null;
    private _scaleBar: HTMLElement = null;
    private _options: ScaleBarControlOptions = {
        units: 'imperial',
        maxBarLength: 100
    };

    /****************************
     * Constructor
     ***************************/

    /**
    * A control that displays a scale bar relative to the pixel resolution at the center of the map.
    * @param options Options for defining how the control is rendered and functions.
    */
    constructor(options?: ScaleBarControlOptions) {
        this._options = Object.assign(this._options, options || {});
    }

    /****************************
    * Public Methods
    ***************************/

    /**
    * Action to perform when the control is added to the map.
    * @param map The map the control was added to.
    * @param options The control options used when adding the control to the map.
    * @returns The HTML Element that represents the control.
    */
    public onAdd(map: azmaps.Map, options?: azmaps.ControlOptions): HTMLElement {
        const self = this;
        self._map = map;

        //Add the CSS style for the control to the DOM.
        const style = document.createElement('style');
        style.innerHTML = '.azmaps-scaleBar {background-color:rgba(255,255,255,0.8);font-size:10px;border-width:medium 2px 2px;border-style:none solid solid;border-color:black;padding:0 5px;color:black;}';
        document.body.appendChild(style);

        const sb = document.createElement('div');
        sb.className = 'azmaps-scaleBar';
        self._scaleBar = sb;
        
        self._map.events.add('move', self._updateScaleBar);

        self._updateScaleBar();

        return sb;
    }

    /**
     * Action to perform when control is removed from the map.
     */
    public onRemove(): void {
        const self = this;
        if (self._map) {
            self._map.events.remove('move', self._updateScaleBar);
        }
        self._map = null;
        self._scaleBar.remove();
        self._scaleBar = null;
    }

    /****************************
     * Private Methods
     ***************************/

    /** Updates the layout of the scalebar. */
    private _updateScaleBar = () => {
        const self = this;
        const camera = self._map.getCamera();
        const opt = self._options;

        //Get the center pixel.
        const cp = self._map.pixelsToPositions([camera.center]);

        //Calculate two coordinates that are seperated by the maxBarLength pixel distance from the center pixel.
        const pos = self._map.pixelsToPositions([[0, cp[0][1]], [opt.maxBarLength, cp[0][1]]]);

        //Calculate the strightline distance between the positions.
        let units = opt.units.toLowerCase();

        if (units === 'imperial') {
            units = 'miles';
        } else if (units === 'metric') {
            units = 'kilometers';
        }

        let trueDistance = azmaps.math.getDistanceTo(pos[0], pos[1], units);

        //Round the true distance to a nicer number.
        let niceDistance = self._getRoundNumber(trueDistance);
        let isSmall = 0;
        if (niceDistance < 2) {
            units = opt.units.toLowerCase();
            if (units === 'imperial') {
                //Convert to yards.
                trueDistance *= 1760;
                niceDistance = self._getRoundNumber(trueDistance);
                isSmall = 2;

                if(niceDistance < 15) {
                    //Convert to feet.
                    trueDistance *= 3;
                    niceDistance = self._getRoundNumber(trueDistance);
                    isSmall = 1;
                }               
            } else if (units === 'metric') {
                //Convert to meters.
                trueDistance *= 1000;
                niceDistance = self._getRoundNumber(trueDistance);
                isSmall = 1;
            }
        }

        //Calculate the distanceRatio between the true and nice distances and scale the scalebar size accordingly.
        const distanceRatio = niceDistance / trueDistance;

        const sb =  self._scaleBar;
        //Update the width of the scale bar by scaling the maxBarLength option by the distance ratio.
        sb.style.width = (opt.maxBarLength * distanceRatio) + 'px';

        //Update the text of the scale bar.
        sb.innerHTML = self._createDistanceString(niceDistance, isSmall);
    }

    /**
     * Rounds a number to a nice value. 
     * @param num The number to round.
     */
    private _getRoundNumber(num: number): number {
        if (num >= 2) {
            //Convert the number to a round value string and get the number of characters. Then use this to calculate the powe of 10 increment of the number.
            const pow10 = Math.pow(10, (Math.floor(num) + '').length - 1);
            let i = num / pow10;

            //Shift the number to the closest nice number. 
            if (i >= 10) {
                i = 10;
            } else if (i >= 5) {
                i = 5
            } else if (i >= 3) {
                i = 3
            } else if (i >= 2) {
                i = 2;
            } else {
                i = 1;
            }

            return pow10 * i;
        }

        return Math.round(100 * num) / 100;
    }

    /**
     * Create the string to display the distance information.
     * @param num The dustance value.
     * @param isSmall Specifies if the number is a small value (meters or feet).
     */
    private _createDistanceString(num: number, isSmall: number): string {
        if (this._options.units) {
            switch (this._options.units.toLowerCase()) {
                case 'feet':
                case 'foot':
                case 'ft':
                    return num + ' ft';
                case 'kilometers':
                case 'kilometer':
                case 'kilometres':
                case 'kilometre':
                case 'km':
                case 'kms':
                    return num + ' km';
                case 'miles':
                case 'mile':
                case 'mi':
                    return num + ' mi';
                case 'nauticalmiles':
                case 'nauticalmile':
                case 'nms':
                case 'nm':
                    return num + ' nm';
                case 'yards':
                case 'yard':
                case 'yds':
                case 'yrd':
                case 'yrds':
                    return num + ' yds';
                case 'metric':
                    if (isSmall === 1) {
                        return num + ' m';
                    } else {
                        return num + ' km';
                    }
                case 'imperial':
                    if (isSmall === 2) {
                        return num + ' yrds';
                    } else if (isSmall === 1) {
                        return num + ' ft';
                    } else {
                        return num + ' mi';
                    }
                case 'meters':
                case 'metres':
                case 'm':
                default:
                    return num + ' m';
            }
        }
    }
}