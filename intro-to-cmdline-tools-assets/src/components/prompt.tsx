import {
    Rect,
    Circle,
    Layout,
    Txt,
    ShapeProps,
    Shape,
} from '@motion-canvas/2d';

import {
    createRef,
    Reference
} from '@motion-canvas/core';



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



export interface PromptProps extends ShapeProps {
    promptRef: Reference<Layout>
    cmdRef: Reference<Txt>
}

export class Prompt extends Shape {
    public constructor(props?: PromptProps) {
        super({
            ...props
        });

        const username = "jledon"
        const machine = "stuco"
        const directory = "~/git"

        const promptHeight = 50
        const promptPadding = 20

        const promptA = createRef<Rect>();
        const promptB = createRef<Rect>();
        const promptC = createRef<Rect>();
        this.add(
            <>
            <Layout layout ref={props.promptRef}
                // left={view.getOriginDelta(Origin.TopLeft)}
                fontFamily={"courier"}
            >
                <Rect ref={promptA}
                    size={[null, promptHeight]} // scale the width based on the content
                    fill={"#3165c4"}
                    alignItems={"center"}
                >
                    <Txt
                        text={`${username}@${machine}`}
                        fill={"white"}
                        stroke={"white"}
                        lineWidth={2}
                        padding={[0, promptPadding]}
                    />
                </Rect>

                <Rect ref={promptB}
                    left={promptA().right}

                    size={[null, promptHeight]}
                    fill={"#cccccc"}
                    alignItems={"center"}
                >
                    <Txt
                        text={directory}
                        fill={"black"}
                        stroke={"black"}
                        lineWidth={3}
                        padding={[0, promptPadding]}
                    />
                </Rect>

                <Rect ref={promptC}
                    left={promptB().right}

                    size={[null, promptHeight]}
                    alignItems={"center"}
                >
                    <Txt
                        text={"main >"}
                        fill={"#777777"}
                        stroke={"#777777"}
                        lineWidth={2}
                        padding={[0, promptPadding]}
                    />
                </Rect>
            </Layout>

            <Txt ref={props.cmdRef}
                left={props.promptRef().right}

                text={""}
                fontFamily={"courier"}
                stroke={"white"}
                fill={"white"}
                lineWidth={2}
            />
        </>
        )
    }
}

