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
    Vector2,
} from '@motion-canvas/core';
import { Commit } from '../components/commit';
import { CommitRelationArrow } from '../components/commit-arrow';
import { Prompt } from '../components/prompt';


interface NodeType {
    ref: Reference<Circle>
    fill: PossibleColor
    stroke: PossibleColor
    opacity: number
    hash: string
}
var nodes = new Map<string, NodeType[]>()

nodes.set("main", [
    {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        opacity: 1,
        hash: "e11e6f2",
    },
    {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        opacity: 1,
        hash: "fd08dd5",
    },
    {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        opacity: 1,
        hash: "aeb6342",
    },
    {
        ref: createRef<Circle>(),
        fill: "#213419",
        stroke: "#89bd60",
        opacity: 1,
        hash: "aa048dd",
    },
])


 nodes.set("feature", [
    {
        ref: createRef<Circle>(),
        fill: "#1d363e",
        stroke: "#72c3e2",
        opacity: 1,
        hash: "5cfb237",
    },
    {
        ref: createRef<Circle>(),
        fill: "#1d363e",
        stroke: "#72c3e2",
        opacity: 1,
        hash: "62d65c0",
    },
    {
        ref: createRef<Circle>(),
        fill: "#1d363e",
        stroke: "#72c3e2",
        opacity: 1,
        hash: "1738d43",
    },
])



 nodes.set("bugfix", [
    {
        ref: createRef<Circle>(),
        fill: "#451f15",
        stroke: "#ef7d5e",
        opacity: 1,
        hash: "ee04c63",
    },
    {
        ref: createRef<Circle>(),
        fill: "#451f15",
        stroke: "#ef7d5e",
        opacity: 0,
        hash: "70135fe",
    }
])

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

    nodes.forEach((commits, commitName) => {
        commits.forEach((commit, i) => {
            view.add(
                <Circle ref={commit.ref}
                    width={225}
                    ratio={1}

                    fill={commit.fill}
                    stroke={commit.stroke}
                    lineWidth={10}

                    opacity={commit.opacity}
                >
                    <Txt
                        {...textStyle}
                        text={commit.hash}
                    />
                </Circle>
            )

            if (i != 0) {
                view.add(
                    <CommitRelationArrow
                        commitParent={commits[i-1].ref}
                        commitChild={commit.ref}
                        opacity={commit.ref().opacity}
                    />
                )
            }
        })
    })

    // branch arrows
    view.add(
        <>
        <CommitRelationArrow
            commitParent={nodes.get("main")[1].ref}
            commitChild={nodes.get("feature")[0].ref}
        />
        <CommitRelationArrow
            commitParent={nodes.get("main")[3].ref}
            commitChild={nodes.get("bugfix")[0].ref}
        />
        </>
    )





    let bot = view.getOriginDelta(Origin.Bottom)
    nodes.forEach((commits, commitName) => {
        let commitOffset = 325;
        let baseX = 0;
        let baseY = 0;
        switch(commitName) {
            case "main":
                baseX = 0;
                baseY = -200;
                break;
            case "feature":
                baseX = 300;
                baseY = -650;
                break;
            case "bugfix":
                baseX = -300;
                baseY = -1300;
                break;
            default:
                break;
        }

        commits.forEach((commit, i) => {
            let pos = bot.add(new Vector2(baseX, baseY - i*commitOffset))
            commit.ref().position(pos)
            // commit.ref().absolutePosition(() => [baseX, baseY - i*commitOffset])
        })
    })

    let branch = createRef<Rect>();
    view.add(
        <Rect layout ref={branch}
            fill={"#484506"}
            stroke={"#fbf02e"}
            lineWidth={6}

            // size={[null, null]}
            bottom={nodes.get("main")[3].ref().top}
            alignItems={"center"}
            padding={10}

            opacity={1}
        >
            <Txt
                {...textStyle}
                text={"HEAD"}
            />
        </Rect>

    )



    yield* nodes.get("bugfix")[1].ref().opacity(1, 2)
});
