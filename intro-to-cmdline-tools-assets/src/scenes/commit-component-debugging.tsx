import {
    makeScene2D,
    Line,
    Circle,
    Txt,
    CubicBezier,
    Ray,
    Rect,
    Node,
    Layout,
} from '@motion-canvas/2d';

import {
    all,
    chain,
    createRef,
    createSignal,
    linear,
    Origin,
} from '@motion-canvas/core';
import { Cmt, Commit } from '../components/commit';
import { CommitRelationArrow } from '../components/commit-arrow';
import { Prompt } from '../components/prompt';

export default makeScene2D(function* (view) {
    view.fill("black")

    const cAref = createRef<Circle>();
    const cBref = createRef<Circle>();
    const cCref = createRef<Circle>();
    const cDref = createRef<Circle>();
    const hash = createSignal<string>("f79f20")

    const rotationPath = createRef<Circle>();
    const progress = createSignal(0);
    view.add(
        <>
        <Commit
            commitRef={cAref}
            fillColor={"#451f15"}
            strokeColor={"#ef7d5e"}
            // commitHash={"f79f20"}
            commitHash={hash}

            x={-150}
            ratio={1/1.25}
        />
        <>
        <Circle ref={cAref}
            width={200}
            ratio={2}
            lineWidth={8}
            fill={"#451f15"} // these come after because they are mandatory to set
            stroke={"#ef7d5e"}
            >
            <Txt
                text={"f79f20"}
                stroke={"white"}

                fontFamily={"courier"}
                // fontWeight={700},
                lineWidth={3}

                letterSpacing={1}
            />
        </Circle>
        </>
        <Circle
            ref={rotationPath}
            ratio={2}
            width={1000}
            stroke={"yellow"}
            lineWidth={6}
            x={cAref().absolutePosition().x}
        />


        <Commit
            commitRef={cBref}
            position={() => rotationPath().getPointAtPercentage(progress()).position}
            fillColor={"#1d363e"}
            strokeColor={"#72c3e2"}
            commitHash={"3b5220"}
            // opacity={0}
        />
        <Commit
            commitRef={cCref}
            fillColor={"#213419"}
            strokeColor={"#89bd60"}
            commitHash={"ba09f4"}

            x={150}
            y={-400}
        />



        <CommitRelationArrow
            commitParent={cAref}
            commitChild={cBref}
        />
        <CommitRelationArrow
            commitParent={cBref}
            commitChild={cCref}
        />
        </>
    )

    yield* all(
        cBref().opacity(1, 2),

        cAref().absoluteRotation(90, 8),
        cBref().absoluteRotation(720, 8),
        // cB().position.y(-300, 4),//.to(-300, 1),
        progress(1, 8)
    );
});
