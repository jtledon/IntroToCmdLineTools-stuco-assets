import {
    Txt,
    Circle,
    CircleProps,
    colorSignal,
    initial,
    signal,
} from '@motion-canvas/2d';
import {
    Reference,
    SignalValue,
    ColorSignal,
    PossibleColor,
    SimpleSignal,
    createRef,
} from '@motion-canvas/core';

const commitStyle = {
    width: 200,
    ratio: 1,
    // ratio: 1/2,
    // ratio: 2,
    lineWidth: 8
}
const textStyle = {
    fontFamily: "courier",

    stroke: "white",
    fill: "white",
    // fontWeight={700},
    lineWidth: 3,

    letterSpacing: 1,
}

export interface CommitProps extends CircleProps {
    commitRef: Reference<Circle>
    commitHash?: SignalValue<string>
    fillColor?: SignalValue<PossibleColor>;
    strokeColor?: SignalValue<PossibleColor>;
}

export class Commit extends Circle {
    @initial("fill-in")
    @signal()
    public declare readonly commitHash: SimpleSignal<string, this>

    // @initial("#ffddcc")
    // @colorSignal()
    // public declare readonly fillColor: ColorSignal<this>
    //
    // @initial("orange")
    // @colorSignal()
    // public declare readonly strokeColor: ColorSignal<this>

    public constructor(props?: CommitProps) {
        super({
            ...props,
        })
        // this.commitHash = props.commitHash()

        this.add(
            <>
            <Circle ref={props.commitRef}
                {...commitStyle} // this come first to have a default
                {...props} // these come next so that I can override the defaults using props
                fill={props.fillColor} // these come after because they are mandatory to set
                stroke={props.strokeColor}
                // x={-150}
            >
                <Txt
                    {...textStyle}
                    text={props.commitHash}
                    // text={`${props.commitRef()}`}
                />
            </Circle>
            </>
        )
    }
}
