import {
    Circle,
    Line,
    Ray,
    RayProps,
} from '@motion-canvas/2d';

import {
    createSignal,
    createRef,
    Vector2,
    Reference,
    clamp,
} from '@motion-canvas/core';

// https://motioncanvas.io/docs/custom-components/
export interface CommitRelationArrowProps extends RayProps {
    commitParent: Reference<Circle>
    commitChild: Reference<Circle>
}

const arrowOffsets = 20;
const arrowStyle = {
    stroke: "white",
    // lineWidth: 16,

    arrowSize: 36,
    // startArrow: true,
    endArrow: true,

    startOffset: arrowOffsets,
    endOffset: arrowOffsets,
}

export class CommitRelationArrow extends Ray {
    public constructor(props?: CommitRelationArrowProps) {
        super({
            ...props,
        })

        // CONNECTIONS GO FROM CHILD TO PARENT
        const cPrnt = props.commitParent
        const cChld = props.commitChild

        // This is generalized for elipses, which will trivially work for circles as well
        let majorPrnt = Math.max(cPrnt().size().x, cPrnt().size().y) / 2
        let minorPrnt = Math.min(cPrnt().size().x, cPrnt().size().y) / 2
        // this is to combat the implicit assumption that the major axis of an ellipse will always be on the X-axis
        if (cPrnt().size().x < cPrnt().size().y) {
            [majorPrnt, minorPrnt] = [minorPrnt, majorPrnt]
        }

        let majorChld = Math.max(cChld().size().x, cChld().size().y) / 2
        let minorChld = Math.min(cChld().size().x, cChld().size().y) / 2
        // this is to combat the implicit assumption that the major axis of an ellipse will always be on the X-axis
        if (cChld().size().x < cChld().size().y) {
            [majorChld, minorChld] = [minorChld, majorChld]
        }

        // https://www.mathopenref.com/ellipseaxes.html#:~:text=The%20major%20and%20minor%20axes,the%20ellipse%20is%20a%20circle.
        // https://stackoverflow.com/questions/17130079/finding-the-radius-of-an-ellipse-based-on-its-angle-from-major-or-minor-axis
        const thetaChld = createSignal(() => Math.atan2(cChld().position.y() - cPrnt().position.y(), cChld().position.x() - cPrnt().position.x()) )
        const thetaPrnt = createSignal(() => Math.atan2(cPrnt().position.y() - cChld().position.y(), cPrnt().position.x() - cChld().position.x()) )
        const calcRad = (name: string, theta: number, rotation: number, major: number, minor: number) => {
            let majSquared = major**2 * Math.sin(theta - rotation)**2
            let minSquared = minor**2 * Math.cos(theta - rotation)**2
            let rad = (major * minor) / (Math.sqrt(majSquared + minSquared))
            return rad
        }
        const rotPrnt = createSignal(() => cPrnt().rotation()*Math.PI/180)
        const rotChld = createSignal(() => cChld().rotation()*Math.PI/180)
        const radPrnt = createSignal(() => calcRad("Parent", thetaPrnt(), rotPrnt(), majorPrnt, minorPrnt))
        const radChld = createSignal(() => calcRad("Child", thetaChld(), rotChld(), majorChld, minorChld))

        const offsetPrnt = Vector2.createSignal(() => new Vector2(
            radPrnt()*Math.cos(thetaPrnt()),
            radPrnt()*Math.sin(thetaPrnt())
        ))
        const offsetChld = Vector2.createSignal(() => new Vector2(
            radChld()*Math.cos(thetaChld()),
            radChld()*Math.sin(thetaChld())
        ))

        const ray = createRef<Ray>();
        this.add(
            <>
            <Ray
                ref={ray}
                from={() => cChld().position().sub(offsetChld())}
                to={() => cPrnt().position().sub(offsetPrnt())}
                lineWidth={() => clamp(0, 16, ray().arcLength()) }
                {...arrowStyle}
            />
            <Line
                stroke={"red"}
                points={[
                    cChld().position,
                    () => cChld().position().sub(offsetChld())
                ]}
                lineWidth={4}
                opacity={0}
            />
            <Line
                stroke={"red"}
                points={[
                    cPrnt().position,
                    () => cPrnt().position().sub(offsetPrnt())
                ]}
                lineWidth={4}
                opacity={0}
            />
            </>
        )
    }
}
