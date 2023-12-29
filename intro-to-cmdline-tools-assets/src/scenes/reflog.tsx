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
    createRefArray,
    createRefMap,
    createSignal,
    linear,
    Origin,
    PossibleColor,
    Reference,
} from '@motion-canvas/core';
import { Commit } from '../components/commit';
import { CommitRelationArrow } from '../components/commit-arrow';
import { Prompt } from '../components/prompt';


interface NodeType {
    ref: Reference<Circle>
    fill: PossibleColor
    stroke: PossibleColor
    hash: string
}
var nodes = new Map<string, NodeType>()

nodes.set("main1", {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        hash: "fd62a7",
})
nodes.set("main2", {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        hash: "fd62a7",
})
nodes.set("main3", {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        hash: "fd62a7",
})
 nodes.set("main4", {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        hash: "fd62a7",
})



 nodes.set("feature1", {
        ref: createRef<Circle>(),
        fill: "#1d363e",
        stroke: "#72c3e2",
        hash: "fd62a7",
})
 nodes.set("feature2", {
        ref: createRef<Circle>(),
        fill: "#1d363e",
        stroke: "#72c3e2",
        hash: "fd62a7",
})
 nodes.set("feature3", {
        ref: createRef<Circle>(),
        fill: "#1d363e",
        stroke: "#72c3e2",
        hash: "fd62a7",
})



 nodes.set("bugfix1", {
        ref: createRef<Circle>(),
        fill: "#451f15",
        stroke: "#ef7d5e",
        hash: "fd62a7",
})
 nodes.set("bugfix2", {
        ref: createRef<Circle>(),
        fill: "#451f15",
        stroke: "#ef7d5e",
        hash: "fd62a7",
})

const textStyle = {
    stroke: "white",

    fontFamily: "courier",
    // fontWeight={700},
    lineWidth: 3,

    letterSpacing: 1,
}

export default makeScene2D(function* (view) {
    view.fill("black")

    // for (let i = 0; i < nodes.length; i++) {
    //     view.add(
    //         <Circle ref={circRefs}
    //             width={200}
    //             ratio={1}
    //             x={i*250}
    //             y={0}
    //
    //             fill={nodes[i].fill}
    //             stroke={nodes[i].stroke}
    //             lineWidth={10}
    //         >
    //             <Txt
    //                 text={nodes[i].hash}
    //             />
    //         </Circle>
    //     )
    // }

    // view.add(
    //     {circRefs.map((ref, i) => {
    //         <Circle ref={circRefs}
    //             width={200}
    //             ratio={1}
    //             x={i*250}
    //             y={0}
    //
    //             fill={nodes[i].fill}
    //             stroke={nodes[i].stroke}
    //             lineWidth={10}
    //         >
    //             <Txt
    //                 text={nodes[i].hash}
    //             />
    //         </Circle>
    //     })}
    // )

    nodes.forEach((commitData, commitName) => {
        view.add(
            <Circle ref={commitData.ref}
                width={200}
                ratio={1}

                fill={commitData.fill}
                stroke={commitData.stroke}
                lineWidth={10}
            >
                <Txt
                    {...textStyle}
                    text={commitData.hash}
                />
            </Circle>

        )
    })

    nodes.get("main1").ref().position(() => [0, 0])
    nodes.get("main2").ref().position(() => [0, -250])
    nodes.get("main3").ref().position(() => [0, -500])
    nodes.get("main4").ref().position(() => [0, -750])
    nodes.get("feature1").ref().position(() => [250, -400])
    nodes.get("feature2").ref().position(() => [250, -650])
    nodes.get("feature3").ref().position(() => [250, -900])
    nodes.get("bugfix1").ref().position(() => [-250, -900])
    nodes.get("bugfix2").ref().position(() => [-250, -1150])

    // yield* circRefs[0].position.x(1000, 2)
    // yield* all(...circRefs.map(circ => circ.fill('white', 1.5)));
});
