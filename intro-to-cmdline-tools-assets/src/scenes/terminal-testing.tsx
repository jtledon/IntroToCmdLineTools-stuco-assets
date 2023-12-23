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
import { Prompt } from '../components/prompt';

export default makeScene2D(function* (view) {
    view.fill("black")

    const prompt = createRef<Layout>();
    const text = createRef<Txt>();

    const promptB = createRef<Layout>();
    const textB = createRef<Txt>();

    view.add(
        <>
        <Prompt
            promptRef={prompt}
            cmdRef={text}
        />
        <Prompt
            promptRef={promptB}
            cmdRef={textB}
        />
        </>
    )
    prompt().left(view.getOriginDelta(Origin.TopLeft))
    prompt().position(prompt().position().addY(prompt().size.y()/2))

    promptB().left(view.getOriginDelta(Origin.TopLeft))
    promptB().position(promptB().position().addY(3*promptB().size.y()/2))

    yield* text().text("", 0).to("git checkout feature", 2.5, linear)
});
