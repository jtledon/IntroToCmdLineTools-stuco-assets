import {
    Circle,
    CircleProps,
    Txt,
} from '@motion-canvas/2d';

// import {
//     Color
// } from '@motion-canvas/core';

export interface CommitProps extends CircleProps {
    commitHash: string
}


const commitStyle = {
    width: 200,
    ratio: 1,
    // ratio: 1/2,
    // ratio: 2,
    lineWidth: 8
}
const textStyle = {
    stroke: "white",

    fontFamily: "courier",
    // fontWeight={700},
    lineWidth: 3,

    letterSpacing: 1,
}

export class Commit extends Circle {
    public constructor(props?: CommitProps) {
        super({
            ...props,
        })

        this.add(
            <>
            <Circle
                {...props}
                {...commitStyle}
            >
                <Txt
                    text={props.commitHash}
                    {...textStyle}
                />
            </Circle>
            </>
        )
    }
}
