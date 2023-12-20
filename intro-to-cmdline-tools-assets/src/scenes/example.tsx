import {makeScene2D, Circle, Txt} from '@motion-canvas/2d';
import {all, createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    view.fill("black")

    const commitA = createRef<Circle>();
    const commitB = createRef<Circle>();

    const textStyle = {
        stroke: "white",

        fontFamily: "courier",
        // fontWeight={700},
        lineWidth: 3,

        letterSpacing: 1,
    }

    const commitStyle = {
        width: 200,
        ratio: 1,
        lineWidth: 8
    }

    view.add(
        <>
        <Circle
            ref={commitA}

            x={-300}
            fill="#451f15"
            stroke="#ef7d5e"

            {...commitStyle}
        />
        <Txt
            text={"f79f20"}
            x={() => commitA().position.x()}
            y={() => commitA().position.y()}
            {...textStyle}
        />
        </>
    );

    view.add(
        <>
        <Circle
            ref={commitB}

            x={-300}
            fill="#e1323877"
            stroke="#e13238"

            {...commitStyle}
        />
        <Txt
            text={"3b5220"}
            x={() => commitB().position.x()}
            y={() => commitB().position.y()}
            {...textStyle}
        />
        </>
    );

    yield* all(
            commitA().position.x(300, 1).to(-300, 1),
            commitA().position.y(300, 1).to(-300, 1),
            );
});
