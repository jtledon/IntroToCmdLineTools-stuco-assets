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
    Matrix2D,
} from '@motion-canvas/core';

// https://motioncanvas.io/docs/custom-components/
export interface CommitRelationArrowProps extends RayProps {
    commitParent: Reference<Circle>
    commitChild: Reference<Circle>
}

const arrowStyle = {
    stroke: "white",
    // lineWidth: 16,

    arrowSize: 36,
    startArrow: true, // TODO: remove
    endArrow: true,

    startOffset: 20,
    endOffset: 20,
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
        const majorPrnt = Math.max(cPrnt().size().x, cPrnt().size().y) / 2
        const minorPrnt = Math.min(cPrnt().size().x, cPrnt().size().y) / 2

        const majorChld = Math.max(cChld().size().x, cChld().size().y) / 2
        const minorChld = Math.min(cChld().size().x, cChld().size().y) / 2

        // TODO: add rotation into this calculation
        const thetaChld = createSignal(() => Math.atan2(cChld().position.y() - cPrnt().position.y(), cChld().position.x() - cPrnt().position.x()) )
        const thetaPrnt = createSignal(() => Math.atan2(cPrnt().position.y() - cChld().position.y(), cPrnt().position.x() - cChld().position.x()) )
        // const thetaPrnt = createSignal(() => Math.PI/2 - thetaChld())
        const calcRad = (name: string, theta: number, rotation: number, major: number, minor: number) => {
            // if (rotation != 0) {
                console.log("\n", name)
                console.log("theta: ", theta)
                console.log("rotation: ", rotation)
                console.log("addition: ", theta + rotation)
            // }
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

        // https://en.wikipedia.org/wiki/Rotation_matrix
        /* const rotatedFromOffset = Vector2.createSignal(() => new Vector2(
            fromOffset.x()*Math.cos(cA().rotation()) - fromOffset.y()*Math.sin(cA().rotation()),
            fromOffset.x()*Math.sin(cA().rotation()) + fromOffset.y()*Math.cos(cA().rotation())
        ))
        const rotatedToOffset = Vector2.createSignal(() => new Vector2(

        )) */

        const ray = createRef<Ray>();
        this.add(
            <>
            <Ray
                // x={() => cB().position.x()}
                // y={() => cB().position.y()}
                ref={ray}
                from={() => cChld().position().sub(offsetChld())}
                to={() => cPrnt().position().sub(offsetPrnt())}
                // from={cB().position}
                // to={cA().position}
                lineWidth={() => clamp(0, 16, ray().arcLength()) }
                {...arrowStyle}
            />
            <Line
                stroke={"red"}
                points={[
                    cChld().position,
                    () => cChld().position().sub(offsetChld())
                ]}
                lineWidth={8}
            />
            <Line
                stroke={"red"}
                points={[
                    cPrnt().position,
                    () => cPrnt().position().sub(offsetPrnt())
                ]}
                lineWidth={8}
            />
            </>
        )
    }
}
