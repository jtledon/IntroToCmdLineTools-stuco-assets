import {
    makeScene2D,
    Line,
    Circle,
    Txt,
    CubicBezier,
    Ray,
    Rect
} from '@motion-canvas/2d';

import {
    all,
    createRef,
    createSignal
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    view.fill("black")

    const username = "jledon"
    const machine = "stuco"
    const directory = "~/git"

    console.log(view.left(), view.topLeft(), view.bottomLeft())
    const promptHeight = 50
    const promptPadding = 20


    const promptA = createRef<Rect>();
    const promptB = createRef<Rect>();
    const promptC = createRef<Rect>();
    view.add(
        <>
        <Rect layout
            ref={promptA}
            fill={"#3165c4"}
            size={[null, promptHeight]}
            offset={[-1, -1]}
            height={promptHeight}
            // left={view.left} // FIXME: should work
        >
            <Txt
                text={`${username}@${machine}`}
                stroke={"white"}
                fontFamily={"courier"}
                lineWidth={2}
                padding={[0, promptPadding]}
            />
        </Rect>

        <Rect layout
            ref={promptB}
            fill={"#cccccc"}
            size={[null, 50]}
            // offset={[-1, 0]}
            height={promptHeight}
            left={promptA().right}
        >
            <Txt
                text={directory}
                stroke={"black"}
                fontFamily={"courier"}
                lineWidth={2}
                padding={[0, promptPadding]}
            />
        </Rect>

        <Rect layout
            ref={promptC}
            size={[null, 50]}
            // offset={[-1, 0]}
            height={promptHeight}
            left={promptB().right}
        >
            <Txt
                text={"main >"}
                stroke={"#777777"}
                fontFamily={"courier"}
                lineWidth={2}
                padding={[0, promptPadding]}
            />
        </Rect>
        </>
    )
    promptA().absolutePosition(view.topLeft()) // FIXME: when this issue gets resolved and merged: https://github.com/motion-canvas/motion-canvas/issues/881
    // promptB().absolutePosition(promptA().position)



    // const node = createRef<Rect>();
    // view.add(
    //     <>
    //     <Rect layout
    //         ref={node}
    //         fill={"red"}
    //         size={100}
    //         offset={[-1, -1]}
    //     />
    //     <Rect layout
    //         fill={"blue"}
    //         size={100}
    //         left={node().right}
    //     />
    //     </>
    // )
});
