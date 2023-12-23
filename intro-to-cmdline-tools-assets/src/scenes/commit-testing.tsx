import {makeScene2D, Line, Circle, Txt, CubicBezier, Ray, Rect} from '@motion-canvas/2d';
import {all, createRef, createSignal, linear} from '@motion-canvas/core';
import { CommitRelationArrow } from '../components/commitArrow';

export default makeScene2D(function* (view) {
    view.fill("black")

    const cA = createRef<Circle>(); // commitA
    const cB = createRef<Circle>(); // commitB
    const cC = createRef<Circle>(); // commitC

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

            // x={0} // TODO: change back to an offset
            x={-150}
            fill="#451f15"
            stroke="#ef7d5e"

            {...commitStyle}
            ratio={1/1.25}
        >
            <Txt
                text={"f79f20"}
                // x={() => cA().position.x()}
                // y={() => cA().position.y()}
                {...textStyle}
            />
        </Circle>
        <Txt
            // text={"f79f20"}
            // x={() => cA().position.x()}
            // y={() => cA().position.y()}
            // {...textStyle}
        />
        </>
    );

    const rotationPath = createRef<Circle>();
    const progress = createSignal(0);

    // TODO: attach text like "feature" or "HEAD" to a commit by using cB.Top
    const branch = createSignal<Rect>();
    view.add(
        <>
        <Circle
            ref={rotationPath}
            ratio={2}
            width={1000}
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
                // text={`${cB()}`}
                // x={() => cB().position.x()}
                // y={() => cB().position.y()}
                {...textStyle}
            />
        </Circle>
        <Txt
            text={"."}
            position={cB().right}
            stroke={"white"}
            fill={"white"}
            lineWidth={2}
        />




        <Circle
            ref={cC}

            x={150}
            y={-400}
            fill="#213419"
            stroke="#89bd60"

            {...commitStyle}
        >
            <Txt
                text={"ba09f4"}
                // x={() => cA().position.x()}
                // y={() => cA().position.y()}
                {...textStyle}
            />
        </Circle>





        <CommitRelationArrow
            commitParent={cB}
            commitChild={cC}
        />
        <CommitRelationArrow
            commitParent={cA}
            commitChild={cB}
        />
        <Rect layout ref={branch}
            fill={"#484506"}
            stroke={"#fbf02e"}
            lineWidth={2}
            size={[null, 100]}
            bottom={cC().top}
            alignItems={"center"}
        >
            <Txt
                text={"asdfasdf"}
            />
        </Rect>



        </>
    );

    yield* all(
        // cB().opacity(1, 4),

        cA().absoluteRotation(90, 16),
        cB().absoluteRotation(720, 16),
        progress(1, 16),

        branch().bottom(cA().top, 2.5)

        // cB().position.y(-300, 4),//.to(-300, 1),
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
