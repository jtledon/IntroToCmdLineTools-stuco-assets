import {
    makeScene2D,
    Line,
    Circle,
    Txt,
    CubicBezier,
    Ray,
    Rect
} from '@motion-canvas/2d';

import {
    all,
    createRef,
    createSignal
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    view.fill("black")

    view.add(
        <Rect
            fill={"red"}
            width={200}
            height={200}
        />
    )
});
