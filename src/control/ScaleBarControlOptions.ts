
/** Options for the ScaleBarControl. */
export interface ScaleBarControlOptions {

    /** The distance units of the scale bar. Default: `'imperial'` */
    units?: 'imperial' | 'metric' | 'meters' | 'kilometers' | 'yards' | 'feet' | 'miles' | 'nauticalMiles';

    /** The maximum length of the scale bar in pixels. Default: `100` */
    maxBarLength?: number;
}