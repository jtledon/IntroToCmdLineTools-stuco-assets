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
    createRef,
    createSignal,
    linear,
    Origin,
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    view.fill("black")

    const username = "jledon"
    const machine = "stuco"
    const directory = "~/git"

    const promptHeight = 80
    const promptPadding = 20


    const textA = createRef<Txt>();

    const prompt = createRef<Layout>();
    const promptA = createRef<Rect>();
    const promptB = createRef<Rect>();
    const promptC = createRef<Rect>();
    view.add(
        <>
            <Layout layout ref={prompt}
                left={view.getOriginDelta(Origin.TopLeft)}
                fontFamily={"courier"}
            >
                <Rect
                    ref={promptA}
                    fill={"#3165c4"}
                    size={[null, promptHeight]} // scale the width based on the content
                    // offset={[-1, -1]}
                    // left={view.left} // FIXME: should work after merging https://github.com/motion-canvas/motion-canvas/issues/88[23]
                    alignItems={"center"}
                >
                    <Txt
                        text={`${username}@${machine}`}
                        fill={"white"}
                        stroke={"white"}
                        lineWidth={2}
                        padding={[0, promptPadding]}
                    />
                </Rect>

                <Rect
                    ref={promptB}
                    fill={"#cccccc"}
                    size={[null, promptHeight]}
                    left={promptA().right}
                    alignItems={"center"}
                >
                    <Txt
                        text={directory}
                        fill={"black"}
                        stroke={"black"}
                        lineWidth={3}
                        padding={[0, promptPadding]}
                    />
                </Rect>

                <Rect
                    ref={promptC}
                    size={[null, promptHeight]}
                    // offset={[-1, 0]}
                    left={promptB().right}
                    alignItems={"center"}
                >
                    <Txt
                        text={"main >"}
                        fill={"#777777"}
                        stroke={"#777777"}
                        lineWidth={2}
                        padding={[0, promptPadding]}
                    />
                </Rect>
            </Layout>

            <Txt
                ref={textA}
                text={"hi"}
                left={prompt().right}
                fontFamily={"courier"}
                stroke={"white"}
                // fill={"white"}
                lineWidth={2}
            />
        </>
    )
    prompt().position(prompt().position().add(prompt().size().div(2)))

    yield* textA().text("", 0).to("git checkout feature", 2.5, linear)
});
