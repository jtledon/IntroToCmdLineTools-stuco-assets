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
    // ratio: 1,
    // ratio: 1/2,
    ratio: 2,
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
            >
                <Txt
                    {...textStyle}
                    text={props.commitHash}
                    // text={`${props.commitRef()}`}
                />
            </Circle>
            <Txt
                text={() => `x(${props.commitRef().position.x().toFixed(2)})\ny(${props.commitRef().position.y().toFixed(2)})`}
                // text={() => `x(${props.commitRef().absolutePosition().x.toFixed(2)})\ny(${props.commitRef().absolutePosition().y.toFixed(2)})`}
                fill={"yellow"}
                stroke={"yellow"}
                lineWidth={2}
                bottom={() => props.commitRef().top()}
                fontSize={36}
            />
            </>
        )
    }
}

// export function* Cmt(
//     commitRef: Reference<Circle>,
//     fillColor: SignalValue<PossibleColor>,
//     strokeColor: SignalValue<PossibleColor>,
//     commitHash: SignalValue<string>) {
//     return (
//         <>
//         <Circle ref={commitRef}
//             {...commitStyle} // this come first to have a default
//             fill={fillColor} // these come after because they are mandatory to set
//             stroke={strokeColor}
//         >
//             <Txt
//                 {...textStyle}
//                 text={commitHash}
//                 // text={`${commitRef()}`}
//             />
//         </Circle>
//         <Txt
//             text={() => `x(${commitRef().position.x().toFixed(2)})\ny(${commitRef().position.y().toFixed(2)})`}
//             // text={() => `x(${commitRef().absolutePosition().x.toFixed(2)})\ny(${commitRef().absolutePosition().y.toFixed(2)})`}
//             fill={"yellow"}
//             stroke={"yellow"}
//             lineWidth={2}
//             bottom={() => commitRef().top()}
//             fontSize={36}
//         />
//         </>
//     )
// }
