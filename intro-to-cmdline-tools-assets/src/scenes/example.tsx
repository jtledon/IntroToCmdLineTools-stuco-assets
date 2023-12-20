import {makeScene2D, Line, Circle, Txt, CubicBezier} from '@motion-canvas/2d';
import {all, createRef, createSignal} from '@motion-canvas/core';

// TODO: make a function that takes in two circles, and returns the points for arrows to draw between them
//          this should use atan2 to get the angle, figure out the x and y offsets using the angle and rad
//          and get the perfect arrow between two circles

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
            fill="#1d363e"
            stroke="#72c3e2"

            opacity={0}
            zIndex={-1}

            {...commitStyle}
        >
            <Txt
                text={"3b5220"}
                // x={() => commitB().position.x()}
                // y={() => commitB().position.y()}
                {...textStyle}
            />
        </Circle>
        </>
    );

    yield* all(
        commitB().position.y(-300, 1),//.to(-300, 1),
        commitB().opacity(1, 1.3)
    );



    // const arrow = createRef<CubicBezier>();
    const arrow = createRef<Line>();

    view.add(
        <Line
            ref={arrow}
            /* points={[
                // commitA().position.x(),
                0,
                () => commitB().position.x(),
            ]} */
            points={() => [
                commitB().position,
                commitA().position
            ]}
            lineWidth={14}
            stroke={"white"}
            // x={commitA().position.x()}
            // y={commitA().position.y()}
            // scale={0}
            endArrow
            startArrow
        />
        /* <CubicBezier
            ref={arrow}

            startArrow
        /> */
    )

    yield* arrow().scale(1, 1)
});
