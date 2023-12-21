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

            x={0} // TODO: change back to an offset
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

    const rotationPath = createRef<Circle>();
    const progress = createSignal(0);

    // TODO: attach text like "feature" or "HEAD" to a commit by using cB.Top
    view.add(
        <>
        <Circle
            ref={rotationPath}
            ratio={1}
            width={800}
            stroke={"yellow"}
            lineWidth={6}
            x={cA().position.x()}
        />
        <Circle
            ref={cB}

            // x={-20}
            position={() => rotationPath().getPointAtPercentage(progress()).position}
            fill="#1d363e"
            stroke="#72c3e2"

            opacity={1}
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
            commitParent={cA}
            commitChild={cB}
        />
        <Txt
            text={"hi"}
            position={cB().right}
            stroke={"white"}
            fill={"white"}
            lineWidth={2}
        />
        </>
    );

    yield* all(
        // cB().opacity(1, 4),

        cB().absoluteRotation(90, 16),
        // cB().position.y(-300, 4),//.to(-300, 1),
        progress(1, 16)
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
