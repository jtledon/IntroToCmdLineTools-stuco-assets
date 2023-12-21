import {makeScene2D, Line, Circle, Txt, CubicBezier, Ray} from '@motion-canvas/2d';
import {all, createRef, createSignal} from '@motion-canvas/core';
import { CommitRelationArrow } from '../components/commitArrow';

// TODO: make a function that takes in two circles, and returns the points for arrows to draw between them
//          this should use atan2 to get the angle, figure out the x and y offsets using the angle and rad
//          and get the perfect arrow between two circles


export default makeScene2D(function* (view) {
    view.fill("black")

    const cA = createRef<Circle>(); // commitA
    const cB = createRef<Circle>(); // commitB
    const cBparent = createRef<Line>();

    const textStyle = {
        stroke: "white",

        fontFamily: "courier",
        // fontWeight={700},
        lineWidth: 3,

        letterSpacing: 1,
    }

    const commitStyle = {
        width: 200,
        // ratio: 1,
        // ratio: 1/2,
        ratio: 2,
        lineWidth: 8
    }

    view.add(
        <>
        <Circle
            ref={cA}

            x={-300}
            fill="#451f15"
            stroke="#ef7d5e"

            {...commitStyle}
        />
        <Txt
            text={"f79f20"}
            x={() => cA().position.x()}
            y={() => cA().position.y()}
            {...textStyle}
        />
        </>
    );

    view.add(
        <>
        <Circle
            ref={cB}

            x={-20}
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
        <CommitRelationArrow
            commitA={cA}
            commitB={cB}
        />
        </>
    );

    yield* all(
        cB().position.y(-300, 1),//.to(-300, 1),
        // cB().absoluteRotation(360, 1),
        cB().opacity(1, 1.3)
    );


    // view.add(
    //     <Line
    //         ref={cBparent}
    //         /* points={[
    //             // commitA().position.x(),
    //             0,
    //             () => commitB().position.x(),
    //         ]} */
    //         points={() => [
    //             cB().position,
    //             cA().position
    //         ]}
    //         stroke={"white"}
    //         // x={commitA().position.x()}
    //         // y={commitA().position.y()}
    //         opacity={0}
    //         lineWidth={24}
    //
    //         endArrow
    //         startArrow
    //         arrowSize={36}
    //     />
    //     /* <CubicBezier
    //         ref={arrow}
    //
    //         startArrow
    //     /> */
    // )
    //
    // yield* cBparent().opacity(1, 0.25)
});
