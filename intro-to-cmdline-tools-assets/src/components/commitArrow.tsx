import {
    Txt,
    Rect,
    Circle,
    Line,
    Ray,
    RayProps,
    vector2Signal,
} from '@motion-canvas/2d';

import {
    createSignal,
    createRef,
    Vector2,
    Reference,
    clamp,
    useLogger,
} from '@motion-canvas/core';

// https://motioncanvas.io/docs/custom-components/
export interface CommitRelationArrowProps extends RayProps {
    commitA: Reference<Circle>
    commitB: Reference<Circle>
}

const arrowStyle = {
    stroke: "white",
    // lineWidth: 16,

    arrowSize: 36,
    endArrow: true,

    startOffset: 20,
    endOffset: 20,
}

export class CommitRelationArrow extends Ray {
    public constructor(props?: CommitRelationArrowProps) {
        super({
            ...props,
        })

        // This is generalized for elipses, which will trivially work for circles as well
        const cAsize = props.commitA().size()
        const majorA = Math.max(cAsize.x, cAsize.y) / 2
        const minorA = Math.min(cAsize.x, cAsize.y) / 2
        const cApos = props.commitA().position

        const cBsize = props.commitB().size()
        const majorB = Math.max(cBsize.x, cBsize.y) / 2
        const minorB = Math.min(cBsize.x, cBsize.y) / 2
        const cBpos = props.commitB().position

        // TODO: add rotation into this calculation
        const theta = createSignal(() => Math.atan2(cApos.y() - cBpos.y(), cApos.x() - cBpos.x()) )
        const calcRad = (theta : number, major : number, minor : number) => {
            let majSquared = major**2 * Math.sin(theta)**2
            let minSquared = minor**2 * Math.cos(theta)**2
            let rad = (major * minor) / (Math.sqrt(majSquared + minSquared))
            return rad
        }
        const aRad = createSignal(() => calcRad(theta(), majorA, minorA))
        const bRad = createSignal(() => calcRad(theta(), majorB, minorB))

        const fromOffset = Vector2.createSignal(() => new Vector2(aRad()*Math.cos(theta()), aRad()*Math.sin(theta())))
        const toOffset = Vector2.createSignal(() => new Vector2(bRad()*Math.cos(theta()), bRad()*Math.sin(theta())))

        const ray = createRef<Ray>();
        this.add(
            <>
            <Ray
                // x={() => props.commitB().position.x()}
                // y={() => props.commitB().position.y()}
                ref={ray}
                from={() => props.commitB().position().add(fromOffset())}
                to={() => props.commitA().position().sub(toOffset())}
                // from={props.commitB().position}
                // to={props.commitA().position}
                lineWidth={() => clamp(0, 16, ray().arcLength()) }
                {...arrowStyle}
            />
            <Line
                stroke={"red"}
                points={[
                    props.commitB().position,
                    () => props.commitB().position().add(fromOffset())
                ]}
                lineWidth={8}
            />
            <Line
                stroke={"red"}
                points={[
                    props.commitA().position,
                    () => props.commitA().position().sub(toOffset())
                ]}
                lineWidth={8}
            />
            </>
        )
    }
}
