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
import { Commit } from '../components/commit';
import { CommitRelationArrow } from '../components/commitArrow';
import { Prompt } from '../components/prompt';

export default makeScene2D(function* (view) {
    view.fill("black")

    const cAref = createRef<Circle>();
    const cBref = createRef<Circle>();
    const cCref = createRef<Circle>();
    const cDref = createRef<Circle>();

    const rotationPath = createRef<Circle>();
    const progress = createSignal(0);
    view.add(
        <>
        <Commit
            commitRef={cAref}
            fillColor={"#451f15"}
            strokeColor={"#ef7d5e"}
            commitHash={"f79f20"}

            x={-150}
            ratio={1/1.25}
        />
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
